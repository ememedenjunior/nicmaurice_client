import axios from "axios";
import Cookies from "js-cookie";

// Set VITE_API_URL in client/.env (see .env.example). In development it falls
// back to a local backend, in production to the deployed API.
export const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:4000"
    : "https://nicmauricebackend-production.up.railway.app")
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

// Where to send the user when their session is no longer valid
const loginPathFor = (pathname) => {
  if (pathname.startsWith("/academy/admin")) return "/academy/admin/login";
  if (pathname.startsWith("/academy/teacher")) return "/academy/teacher/login";
  return "/academy/login";
};

export const clearSession = () => {
  ["token", "data", "teacherData", "userRole"].forEach((k) => Cookies.remove(k));
};

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    // An expired / invalid token on a protected call -> back to login.
    // (Login endpoints also return 401 for wrong credentials; leave those alone.)
    if (status === 401 && !url.includes("/login") && Cookies.get("token")) {
      clearSession();
      if (typeof window !== "undefined") {
        window.location.assign(loginPathFor(window.location.pathname));
      }
    }
    return Promise.reject(error);
  },
);

// Best readable message from an axios error
export const errorMessage = (error, fallback = "Something went wrong") =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  (error?.request ? "Unable to reach the server. Check your connection." : "") ||
  fallback;

export default api;
