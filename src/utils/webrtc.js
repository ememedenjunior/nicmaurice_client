// utils/webrtc.js - Add to your frontend
class WebRTCManager {
  constructor(socket, sessionId, userId, role) {
    this.socket = socket;
    this.sessionId = sessionId;
    this.userId = userId;
    this.role = role;
    this.peerConnections = new Map();
    this.localStream = null;
    this.remoteStreams = new Map();
    
    this.configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
  }

  async initLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  async createOffer(targetUserId) {
    const pc = new RTCPeerConnection(this.configuration);
    this.peerConnections.set(targetUserId, pc);

    // Add local tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        pc.addTrack(track, this.localStream);
      });
    }

    // Handle remote tracks
    pc.ontrack = (event) => {
      this.remoteStreams.set(targetUserId, event.streams[0]);
      this.onRemoteStream?.(targetUserId, event.streams[0]);
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('webrtc:ice-candidate', {
          sessionId: this.sessionId,
          targetUserId,
          candidate: event.candidate
        });
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    this.socket.emit('webrtc:offer', {
      sessionId: this.sessionId,
      targetUserId,
      offer
    });

    return offer;
  }

  async handleOffer(from, offer) {
    const pc = new RTCPeerConnection(this.configuration);
    this.peerConnections.set(from, pc);

    // Add local tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        pc.addTrack(track, this.localStream);
      });
    }

    // Handle remote tracks
    pc.ontrack = (event) => {
      this.remoteStreams.set(from, event.streams[0]);
      this.onRemoteStream?.(from, event.streams[0]);
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('webrtc:ice-candidate', {
          sessionId: this.sessionId,
          targetUserId: from,
          candidate: event.candidate
        });
      }
    };

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    this.socket.emit('webrtc:answer', {
      sessionId: this.sessionId,
      targetUserId: from,
      answer
    });
  }

  async handleAnswer(from, answer) {
    const pc = this.peerConnections.get(from);
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  async handleIceCandidate(from, candidate) {
    const pc = this.peerConnections.get(from);
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  onRemoteStream(callback) {
    this.onRemoteStream = callback;
  }

  closeAllConnections() {
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
  }
}

export default WebRTCManager;