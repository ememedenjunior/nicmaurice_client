import { useCallback, useEffect, useRef, useState } from "react";
import api, { errorMessage } from "../utils/api";
import {
  createLiveSocket,
  emitWithAck,
  loadIceServers,
  normalizeChatMessage,
  waitForConnect,
} from "./liveShared";

/**
 * Student side of a live class.
 *
 * Receive-only: the student joins the session room, the teacher sends an offer,
 * and the student answers. Reconnects automatically if the network drops.
 */
export default function useStudentLive({ notify, studentName }) {
  const [showLiveClassModal, setShowLiveClassModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [participantCount, setParticipantCount] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [teacherVideoEnabled, setTeacherVideoEnabled] = useState(true);
  const [teacherAudioEnabled, setTeacherAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [liveCourseIds, setLiveCourseIds] = useState(() => new Set());

  const remoteVideoRef = useRef(null);
  const chatContainerRef = useRef(null);

  const socketRef = useRef(null);
  const pcRef = useRef(null);
  const pendingRef = useRef([]);
  const teacherSocketRef = useRef(null);
  const sessionRef = useRef(null);
  const iceServersRef = useRef([]);
  const offerTimerRef = useRef(null);
  const resyncCountRef = useRef(0);
  const notifyRef = useRef(notify);
  notifyRef.current = notify;
  const toast = (m, t) => notifyRef.current && notifyRef.current(m, t);

  const closePeer = useCallback(() => {
    clearTimeout(offerTimerRef.current);
    const pc = pcRef.current;
    if (pc) {
      pc.ontrack = null;
      pc.onicecandidate = null;
      pc.onconnectionstatechange = null;
      pc.close();
    }
    pcRef.current = null;
    pendingRef.current = [];
    setRemoteStream(null);
  }, []);

  const resetState = useCallback(() => {
    closePeer();
    sessionRef.current = null;
    teacherSocketRef.current = null;
    resyncCountRef.current = 0;
    setIsLiveActive(false);
    setShowLiveClassModal(false);
    setChatMessages([]);
    setParticipantCount(0);
    setTeacherVideoEnabled(true);
    setTeacherAudioEnabled(true);
    setIsScreenSharing(false);
    setAutoplayBlocked(false);
    setConnectionStatus("disconnected");
  }, [closePeer]);

  // if no offer arrives, ask the teacher to resend (a few times), then give up
  const armOfferTimer = useCallback(() => {
    clearTimeout(offerTimerRef.current);
    offerTimerRef.current = setTimeout(() => {
      if (!sessionRef.current) return;
      if (resyncCountRef.current >= 3) {
        setConnectionStatus("error");
        return;
      }
      resyncCountRef.current += 1;
      socketRef.current &&
        socketRef.current.emit("student:resync", { sessionId: sessionRef.current });
      armOfferTimer();
    }, 8000);
  }, []);

  /* ------------------------------- socket --------------------------------- */
  useEffect(() => {
    const socket = createLiveSocket();
    socketRef.current = socket;

    const rejoin = async () => {
      const res = await emitWithAck(socket, "student:join-session", {
        sessionId: sessionRef.current,
      });
      if (!res.ok) {
        resetState();
        toast(res.error || "Could not rejoin the class", "error");
        return;
      }
      teacherSocketRef.current = res.teacherSocketId;
      setParticipantCount(res.session.participantCount);
      setTeacherVideoEnabled(res.session.media.video);
      setTeacherAudioEnabled(res.session.media.audio);
      setIsScreenSharing(res.session.media.screen);
      setChatMessages((res.chatHistory || []).map(normalizeChatMessage));
      setConnectionStatus("connecting");
      armOfferTimer();
    };

    socket.on("connect", () => {
      if (sessionRef.current) rejoin(); // network blip during a class
    });
    socket.on("disconnect", () => {
      if (sessionRef.current) setConnectionStatus("reconnecting");
    });

    socket.on("webrtc:offer", async ({ from, offer }) => {
      if (!sessionRef.current) return;
      try {
        clearTimeout(offerTimerRef.current);
        closePeer();
        teacherSocketRef.current = from;
        const pc = new RTCPeerConnection({ iceServers: iceServersRef.current });
        pcRef.current = pc;

        pc.ontrack = (e) => {
          const stream = e.streams[0] || new MediaStream([e.track]);
          setRemoteStream(stream);
        };
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            socket.emit("webrtc:ice-candidate", {
              sessionId: sessionRef.current,
              targetSocketId: from,
              candidate: e.candidate,
            });
          }
        };
        pc.onconnectionstatechange = () => {
          if (pcRef.current !== pc) return;
          if (pc.connectionState === "connected") {
            resyncCountRef.current = 0;
            setConnectionStatus("connected");
          } else if (pc.connectionState === "failed") {
            setConnectionStatus("connecting");
            socket.emit("student:resync", { sessionId: sessionRef.current });
            armOfferTimer();
          } else if (pc.connectionState === "disconnected") {
            setConnectionStatus("reconnecting");
            // give it a few seconds to recover by itself, then ask for a new link
            setTimeout(() => {
              if (pcRef.current === pc && pc.connectionState !== "connected") {
                socket.emit("student:resync", { sessionId: sessionRef.current });
                armOfferTimer();
              }
            }, 4000);
          }
        };

        await pc.setRemoteDescription(offer);
        for (const c of pendingRef.current.splice(0)) await pc.addIceCandidate(c);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("webrtc:answer", {
          sessionId: sessionRef.current,
          targetSocketId: from,
          answer: pc.localDescription,
        });
      } catch (err) {
        console.error("Error handling offer:", err);
        setConnectionStatus("error");
      }
    });

    socket.on("webrtc:ice-candidate", async ({ candidate }) => {
      if (!candidate) return;
      const pc = pcRef.current;
      try {
        if (pc && pc.remoteDescription) await pc.addIceCandidate(candidate);
        else pendingRef.current.push(candidate);
      } catch (err) {
        console.error("ICE candidate error:", err);
      }
    });

    socket.on("session:started", (d) => {
      setLiveCourseIds((prev) => new Set(prev).add(String(d.courseId)));
      toast(`Live class started: ${d.courseCode} - ${d.courseName}`, "success");
    });
    socket.on("course:session-ended", (d) =>
      setLiveCourseIds((prev) => {
        const next = new Set(prev);
        next.delete(String(d.courseId));
        return next;
      }),
    );

    socket.on("session:ended", (d) => {
      if (sessionRef.current && d.sessionId === sessionRef.current) {
        resetState();
        toast(d.message || "The live class has ended", "info");
      }
    });
    socket.on("session:teacher-disconnected", () => {
      closePeer();
      setConnectionStatus("reconnecting");
      toast("The teacher lost connection - waiting for them to return...", "info");
    });
    socket.on("session:teacher-resumed", () => {
      setConnectionStatus("connecting");
      armOfferTimer();
    });
    socket.on("session:participants-updated", (d) => setParticipantCount(d.count));

    socket.on("teacher:video-status", (d) => setTeacherVideoEnabled(d.enabled));
    socket.on("teacher:audio-status", (d) => setTeacherAudioEnabled(d.enabled));
    socket.on("teacher:screen-share-status", (d) => setIsScreenSharing(d.sharing));

    socket.on("chat:new-message", (m) =>
      setChatMessages((prev) => [...prev, normalizeChatMessage(m)]),
    );

    return () => {
      socket.off();
      socket.disconnect();
      socketRef.current = null;
      closePeer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // attach the incoming stream to the <video> element
  useEffect(() => {
    const el = remoteVideoRef.current;
    if (!el) return;
    if (el.srcObject !== remoteStream) el.srcObject = remoteStream;
    if (remoteStream) {
      el.play().then(
        () => setAutoplayBlocked(false),
        () => setAutoplayBlocked(true), // browser wants a tap before playing sound
      );
    }
  }, [remoteStream, isLiveActive, showLiveClassModal]);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatMessages]);

  const resumePlayback = useCallback(() => {
    const el = remoteVideoRef.current;
    if (el) el.play().then(() => setAutoplayBlocked(false)).catch(() => {});
  }, []);

  /* --------------------------------- join --------------------------------- */
  const checkLive = useCallback(async (courseId) => {
    const { data } = await api.get(`/api/live/course/${courseId}/active`);
    return data;
  }, []);

  // Ask the server which of the student's courses are live right now
  const refreshLiveCourses = useCallback(async () => {
    try {
      const { data } = await api.get("/api/live/active");
      setLiveCourseIds(new Set(data.sessions.map((s) => String(s.courseId))));
    } catch {
      /* non-critical */
    }
  }, []);

  const joinLiveClass = useCallback(
    async (course) => {
      if (isConnecting || sessionRef.current) return;
      // enrolment rows carry courseId; course catalogue rows use _id
      const courseId = course.courseId || course._id || course.id;
      setIsConnecting(true);
      try {
        const live = await checkLive(courseId);
        if (!live.isLive) {
          toast("No live class is running for this course right now", "info");
          return;
        }
        iceServersRef.current = await loadIceServers();
        const socket = socketRef.current;
        if (!(await waitForConnect(socket))) {
          throw new Error("Could not connect to the live class server");
        }

        sessionRef.current = live.sessionId;
        setSelectedCourse({ ...course, sessionId: live.sessionId });
        setConnectionStatus("connecting");
        setIsLiveActive(true);
        setShowLiveClassModal(true);

        const res = await emitWithAck(socket, "student:join-session", {
          sessionId: live.sessionId,
        });
        if (!res.ok) {
          resetState();
          toast(res.error || "Failed to join the live class", "error");
          return;
        }
        teacherSocketRef.current = res.teacherSocketId;
        resyncCountRef.current = 0;
        setParticipantCount(res.session.participantCount);
        setTeacherVideoEnabled(res.session.media.video);
        setTeacherAudioEnabled(res.session.media.audio);
        setIsScreenSharing(res.session.media.screen);
        setChatMessages((res.chatHistory || []).map(normalizeChatMessage));
        armOfferTimer();
      } catch (err) {
        console.error("Error joining live class:", err);
        resetState();
        toast(errorMessage(err, "Failed to join the live class"), "error");
      } finally {
        setIsConnecting(false);
      }
    },
    [isConnecting, checkLive, resetState, armOfferTimer],
  );

  const leaveLiveClass = useCallback(() => {
    if (socketRef.current && sessionRef.current) {
      socketRef.current.emit("student:leave-session", { sessionId: sessionRef.current });
    }
    resetState();
  }, [resetState]);

  const sendChatMessage = useCallback((text) => {
    const message = (text || "").trim();
    if (!message || !sessionRef.current || !socketRef.current) return false;
    socketRef.current.emit("chat:message", { sessionId: sessionRef.current, message });
    return true;
  }, []);

  return {
    showLiveClassModal,
    setShowLiveClassModal,
    selectedCourse,
    isLiveActive,
    isConnecting,
    connectionStatus,
    participantCount,
    chatMessages,
    teacherVideoEnabled,
    teacherAudioEnabled,
    isScreenSharing,
    autoplayBlocked,
    liveCourseIds,
    remoteVideoRef,
    chatContainerRef,
    joinLiveClass,
    leaveLiveClass,
    sendChatMessage,
    resumePlayback,
    refreshLiveCourses,
    studentName,
  };
}
