import { io } from "socket.io-client";
import Cookies from "js-cookie";
import api, { API_URL } from "../utils/api";

const DEFAULT_ICE = [
  { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
];

// ICE (STUN/TURN) servers come from the backend so TURN credentials stay in
// server config. Falls back to public STUN if the call fails.
export const loadIceServers = async () => {
  try {
    const { data } = await api.get("/api/live/ice-config");
    if (Array.isArray(data.iceServers) && data.iceServers.length) {
      return data.iceServers;
    }
  } catch {
    /* use fallback */
  }
  return DEFAULT_ICE;
};

// Socket that always authenticates with the current token (also on reconnect)
export const createLiveSocket = () =>
  io(API_URL, {
    auth: (cb) => cb({ token: Cookies.get("token") }),
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelayMax: 5000,
  });

// emit with ack + timeout, resolves {ok:false,error} instead of throwing
export const emitWithAck = (socket, event, payload, timeout = 10000) =>
  new Promise((resolve) => {
    if (!socket || !socket.connected) {
      resolve({ ok: false, error: "Not connected to the live class server" });
      return;
    }
    socket.timeout(timeout).emit(event, payload, (err, res) => {
      if (err) resolve({ ok: false, error: "The server did not respond" });
      else resolve(res || { ok: false, error: "Empty response" });
    });
  });

export const waitForConnect = (socket, timeout = 8000) =>
  new Promise((resolve) => {
    if (socket.connected) return resolve(true);
    const timer = setTimeout(() => {
      socket.off("connect", onConnect);
      resolve(false);
    }, timeout);
    const onConnect = () => {
      clearTimeout(timer);
      resolve(true);
    };
    socket.once("connect", onConnect);
    socket.connect();
  });

// Human readable text for getUserMedia / getDisplayMedia failures
export const mediaErrorMessage = (err) => {
  switch (err && err.name) {
    case "NotAllowedError":
    case "SecurityError":
      return "Camera/microphone permission was denied. Allow access in your browser settings and try again.";
    case "NotFoundError":
      return "No camera or microphone was found on this device.";
    case "NotReadableError":
      return "Your camera or microphone is being used by another application.";
    default:
      return "Could not access your camera or microphone.";
  }
};

// Turns a chat payload into something the UI can render (file bytes -> blob URL)
export const normalizeChatMessage = (m) => {
  if (m && m.type === "file" && m.fileData && !m.fileUrl) {
    const blob = new Blob([m.fileData], {
      type: m.mimeType || "application/octet-stream",
    });
    return { ...m, fileUrl: URL.createObjectURL(blob), fileData: undefined };
  }
  return m;
};

export const formatTime = (iso) => {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};
