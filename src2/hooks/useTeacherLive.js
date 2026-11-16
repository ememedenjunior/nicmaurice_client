import { useCallback, useEffect, useRef, useState } from "react";
import {
  createLiveSocket,
  emitWithAck,
  loadIceServers,
  mediaErrorMessage,
  normalizeChatMessage,
  waitForConnect,
} from "./liveShared";

const MAX_FILE_BYTES = 2 * 1024 * 1024;

/**
 * Teacher side of a live class.
 *
 * The teacher publishes camera + microphone (or the screen) and keeps ONE
 * RTCPeerConnection per student. The teacher always creates the offer; the
 * server only relays signalling messages after checking that the student is
 * enrolled in the course.
 */
export default function useTeacherLive({ notify }) {
  const [showLiveClassModal, setShowLiveClassModal] = useState(false);
  const [selectedCourseForLive, setSelectedCourseForLive] = useState(null);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [liveSessionId, setLiveSessionId] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [participantCount, setParticipantCount] = useState(0);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [previewStream, setPreviewStream] = useState(null);

  const localVideoRef = useRef(null);
  const chatContainerRef = useRef(null);

  const socketRef = useRef(null);
  const peersRef = useRef(new Map()); // student socket id -> { pc, pending: [] }
  const cameraRef = useRef(null); // camera + mic stream
  const screenRef = useRef(null); // screen stream while sharing
  const iceServersRef = useRef([]);
  const sessionRef = useRef(null); // current session id
  const recorderRef = useRef(null);
  const notifyRef = useRef(notify);
  notifyRef.current = notify;
  const toast = (m, t) => notifyRef.current && notifyRef.current(m, t);

  /* --------------------------- peer connections --------------------------- */
  const outgoingVideoTrack = () =>
    (screenRef.current && screenRef.current.getVideoTracks()[0]) ||
    (cameraRef.current && cameraRef.current.getVideoTracks()[0]) ||
    null;

  const closePeer = useCallback((id) => {
    const peer = peersRef.current.get(id);
    if (peer) {
      peer.pc.onicecandidate = null;
      peer.pc.ontrack = null;
      peer.pc.onconnectionstatechange = null;
      peer.pc.close();
      peersRef.current.delete(id);
    }
  }, []);

  const offerTo = useCallback(
    async (studentSocketId) => {
      const socket = socketRef.current;
      if (!socket || !sessionRef.current || !cameraRef.current) return;
      closePeer(studentSocketId);

      const pc = new RTCPeerConnection({ iceServers: iceServersRef.current });
      const peer = { pc, pending: [] };
      peersRef.current.set(studentSocketId, peer);

      // Always negotiate a video m-line (even with no camera) so a screen share
      // started later can be swapped in with replaceTrack.
      const video = outgoingVideoTrack();
      peer.videoSender = video
        ? pc.addTrack(video, cameraRef.current)
        : pc.addTransceiver("video", { direction: "sendonly" }).sender;
      cameraRef.current.getAudioTracks().forEach((t) => pc.addTrack(t, cameraRef.current));

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("webrtc:ice-candidate", {
            sessionId: sessionRef.current,
            targetSocketId: studentSocketId,
            candidate: e.candidate,
          });
        }
      };
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "failed") {
          // rebuild the connection; the student may also ask for a resync
          setTimeout(() => {
            if (peersRef.current.get(studentSocketId) === peer) offerTo(studentSocketId);
          }, 1000);
        }
      };

      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("webrtc:offer", {
          sessionId: sessionRef.current,
          targetSocketId: studentSocketId,
          offer: pc.localDescription,
        });
      } catch (err) {
        console.error("Failed to create offer:", err);
        closePeer(studentSocketId);
      }
    },
    [closePeer],
  );

  /* ------------------------------- cleanup -------------------------------- */
  const releaseMedia = useCallback(() => {
    peersRef.current.forEach((_, id) => closePeer(id));
    [cameraRef.current, screenRef.current].forEach((s) =>
      s && s.getTracks().forEach((t) => t.stop()),
    );
    cameraRef.current = null;
    screenRef.current = null;
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      try {
        recorderRef.current.stop();
      } catch {
        /* already stopped */
      }
    }
    recorderRef.current = null;
    setPreviewStream(null);
  }, [closePeer]);

  const resetState = useCallback(() => {
    sessionRef.current = null;
    setIsLiveActive(false);
    setShowLiveClassModal(false);
    setLiveSessionId(null);
    setParticipantCount(0);
    setChatMessages([]);
    setIsScreenSharing(false);
    setIsRecording(false);
    setIsVideoEnabled(true);
    setIsAudioEnabled(true);
    setConnectionStatus("disconnected");
  }, []);

  /* ------------------------------- socket --------------------------------- */
  useEffect(() => {
    const socket = createLiveSocket();
    socketRef.current = socket;

    socket.on("connect", async () => {
      // reconnected in the middle of a class -> take the session back
      if (sessionRef.current) {
        const res = await emitWithAck(socket, "teacher:resume-session", {
          sessionId: sessionRef.current,
        });
        if (res.ok) {
          setConnectionStatus("active");
          setParticipantCount(res.session.participantCount);
          res.students.forEach((s) => offerTo(s.socketId));
          toast("Reconnected - class resumed", "success");
        } else {
          releaseMedia();
          resetState();
          toast("The class ended while you were offline", "error");
        }
      }
    });

    socket.on("disconnect", () => {
      if (sessionRef.current) setConnectionStatus("reconnecting");
    });

    socket.on("webrtc:answer", async ({ from, answer }) => {
      const peer = peersRef.current.get(from);
      if (!peer) return;
      try {
        await peer.pc.setRemoteDescription(answer);
        for (const c of peer.pending.splice(0)) await peer.pc.addIceCandidate(c);
      } catch (err) {
        console.error("Failed to apply answer:", err);
      }
    });

    socket.on("webrtc:ice-candidate", async ({ from, candidate }) => {
      const peer = peersRef.current.get(from);
      if (!peer || !candidate) return;
      try {
        if (peer.pc.remoteDescription) await peer.pc.addIceCandidate(candidate);
        else peer.pending.push(candidate);
      } catch (err) {
        console.error("ICE candidate error:", err);
      }
    });

    socket.on("teacher:student-joined", (d) => {
      setParticipantCount(d.totalStudents);
      if (!d.resync) toast(`${d.studentName} joined the class`, "success");
      offerTo(d.socketId);
    });

    socket.on("teacher:student-left", (d) => {
      setParticipantCount(d.totalStudents);
      closePeer(d.socketId);
      if (!d.silent) toast(`${d.studentName} left the class`, "info");
    });

    socket.on("session:participants-updated", (d) => setParticipantCount(d.count));

    socket.on("chat:new-message", (m) =>
      setChatMessages((prev) => [...prev, normalizeChatMessage(m)]),
    );

    socket.on("session:ended", (d) => {
      // e.g. the same class was restarted from another window
      if (sessionRef.current && d.sessionId === sessionRef.current) {
        releaseMedia();
        resetState();
        toast(d.message || "The class has ended", "info");
      }
    });

    return () => {
      socket.off();
      socket.disconnect();
      socketRef.current = null;
      releaseMedia();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // show the camera / screen in the teacher's own preview <video>
  useEffect(() => {
    if (localVideoRef.current && localVideoRef.current.srcObject !== previewStream) {
      localVideoRef.current.srcObject = previewStream;
    }
  }, [previewStream, isLiveActive, showLiveClassModal]);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatMessages]);

  /* --------------------------------- start -------------------------------- */
  const startLiveClass = useCallback(
    async (course) => {
      if (!course || isStarting || sessionRef.current) return;
      const courseId = course._id || course.id;
      setIsStarting(true);
      setSelectedCourseForLive(course);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast("Live video needs a secure (https) connection and a modern browser.", "error");
        setIsStarting(false);
        return;
      }

      let camera = null;
      try {
        try {
          camera = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 24 } },
            audio: { echoCancellation: true, noiseSuppression: true },
          });
        } catch (err) {
          // no camera? teach with audio only
          if (err.name !== "NotFoundError") throw err;
          camera = await navigator.mediaDevices.getUserMedia({ audio: true });
          toast("No camera found - starting with audio only", "info");
        }

        cameraRef.current = camera; // ready before any student can join
        iceServersRef.current = await loadIceServers();

        const socket = socketRef.current;
        if (!(await waitForConnect(socket))) {
          throw new Error("Could not connect to the live class server");
        }
        const res = await emitWithAck(socket, "teacher:start-session", { courseId });
        if (!res.ok) throw new Error(res.error || "Failed to start the class");

        sessionRef.current = res.session.sessionId;
        setPreviewStream(camera);
        setIsVideoEnabled(camera.getVideoTracks().length > 0);
        setIsAudioEnabled(true);
        setLiveSessionId(res.session.sessionId);
        setParticipantCount(0);
        setChatMessages([]);
        setIsLiveActive(true);
        setShowLiveClassModal(true);
        setConnectionStatus("active");
        toast("Live class started", "success");
      } catch (err) {
        console.error("Error starting live class:", err);
        if (camera) camera.getTracks().forEach((t) => t.stop());
        if (!sessionRef.current) cameraRef.current = null;
        toast(
          err.name ? mediaErrorMessage(err) : err.message || "Failed to start live class",
          "error",
        );
      } finally {
        setIsStarting(false);
      }
    },
    [isStarting],
  );

  /* ---------------------------------- end --------------------------------- */
  const stopLiveClass = useCallback(async () => {
    const sessionId = sessionRef.current;
    if (sessionId && socketRef.current) {
      await emitWithAck(socketRef.current, "teacher:end-session", { sessionId }, 4000);
    }
    releaseMedia();
    resetState();
    toast("Live class ended", "info");
  }, [releaseMedia, resetState]);

  /* ------------------------------ media controls -------------------------- */
  const publishMediaState = (video, audio) => {
    if (socketRef.current && sessionRef.current) {
      socketRef.current.emit("teacher:media-state", {
        sessionId: sessionRef.current,
        video,
        audio,
      });
    }
  };

  const toggleVideo = useCallback(() => {
    const track = cameraRef.current && cameraRef.current.getVideoTracks()[0];
    if (!track) return toast("No camera available", "error");
    track.enabled = !track.enabled;
    setIsVideoEnabled(track.enabled);
    const audio = cameraRef.current.getAudioTracks()[0];
    publishMediaState(track.enabled, audio ? audio.enabled : false);
  }, []);

  const toggleAudio = useCallback(() => {
    const track = cameraRef.current && cameraRef.current.getAudioTracks()[0];
    if (!track) return toast("No microphone available", "error");
    track.enabled = !track.enabled;
    setIsAudioEnabled(track.enabled);
    const video = cameraRef.current.getVideoTracks()[0];
    publishMediaState(video ? video.enabled : false, track.enabled);
  }, []);

  const replaceOutgoingVideo = async (track) => {
    const jobs = [];
    peersRef.current.forEach((peer) => {
      if (peer.videoSender && track) jobs.push(peer.videoSender.replaceTrack(track));
    });
    await Promise.allSettled(jobs);
  };

  const stopScreenSharing = useCallback(async () => {
    const screen = screenRef.current;
    if (!screen) return;
    screenRef.current = null;
    screen.getTracks().forEach((t) => t.stop());
    setIsScreenSharing(false);
    setPreviewStream(cameraRef.current);
    await replaceOutgoingVideo(outgoingVideoTrack());
    if (socketRef.current && sessionRef.current) {
      socketRef.current.emit("teacher:screen-share", {
        sessionId: sessionRef.current,
        sharing: false,
      });
    }
  }, []);

  const shareScreen = useCallback(async () => {
    if (screenRef.current) return stopScreenSharing();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      return toast("Screen sharing is not supported in this browser", "error");
    }
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenRef.current = screen;
      const track = screen.getVideoTracks()[0];
      track.onended = () => stopScreenSharing(); // browser's "Stop sharing" button
      setIsScreenSharing(true);
      setPreviewStream(screen);
      await replaceOutgoingVideo(track);
      socketRef.current.emit("teacher:screen-share", {
        sessionId: sessionRef.current,
        sharing: true,
      });
    } catch (err) {
      if (err.name !== "NotAllowedError") toast("Could not start screen sharing", "error");
    }
  }, [stopScreenSharing]);

  /* ------------------------------- recording ------------------------------ */
  const startRecording = useCallback(() => {
    if (!previewStream || !window.MediaRecorder) {
      return toast("Recording is not supported in this browser", "error");
    }
    const chunks = [];
    // record what the class sees (camera or screen) plus the teacher's voice
    const tracks = [
      ...previewStream.getVideoTracks(),
      ...(cameraRef.current ? cameraRef.current.getAudioTracks() : []),
    ];
    const mime = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"].find(
      (m) => MediaRecorder.isTypeSupported(m),
    );
    try {
      const recorder = new MediaRecorder(new MediaStream(tracks), mime ? { mimeType: mime } : {});
      recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      recorder.onstop = () => {
        if (!chunks.length) return;
        const url = URL.createObjectURL(new Blob(chunks, { type: "video/webm" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = `live-class-${Date.now()}.webm`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        toast("Recording saved to your downloads", "success");
      };
      recorder.start(1000);
      recorderRef.current = recorder;
      setIsRecording(true);
      toast("Recording started", "success");
    } catch (err) {
      console.error(err);
      toast("Could not start recording", "error");
    }
  }, [previewStream]);

  const stopRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    setIsRecording(false);
  }, []);

  /* --------------------------------- chat --------------------------------- */
  const sendChatMessage = useCallback((text) => {
    const message = (text || "").trim();
    if (!message || !sessionRef.current || !socketRef.current) return false;
    socketRef.current.emit("chat:message", { sessionId: sessionRef.current, message });
    return true;
  }, []);

  const shareFile = useCallback(async (file) => {
    if (!file || !sessionRef.current) return;
    if (file.size > MAX_FILE_BYTES) {
      return toast("Files must be 2 MB or smaller", "error");
    }
    const res = await emitWithAck(socketRef.current, "chat:file", {
      sessionId: sessionRef.current,
      fileName: file.name,
      mimeType: file.type,
      data: await file.arrayBuffer(),
    });
    toast(res.ok ? `File shared: ${file.name}` : res.error || "Could not share file", res.ok ? "success" : "error");
  }, []);

  return {
    // state
    showLiveClassModal,
    setShowLiveClassModal,
    selectedCourseForLive,
    setSelectedCourseForLive,
    isLiveActive,
    isStarting,
    liveSessionId,
    connectionStatus,
    participantCount,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    isRecording,
    chatMessages,
    // refs
    localVideoRef,
    chatContainerRef,
    // actions
    startLiveClass,
    stopLiveClass,
    toggleVideo,
    toggleAudio,
    shareScreen,
    startRecording,
    stopRecording,
    sendChatMessage,
    shareFile,
  };
}
