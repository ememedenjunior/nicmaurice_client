import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { clearSession } from "../utils/api";

// Reads the session token; returns null if it is missing, malformed or expired.
const readSession = () => {
  const token = Cookies.get("token");
  if (!token) return null;
  try {
    const claims = jwtDecode(token);
    if (claims.exp && claims.exp * 1000 <= Date.now()) return null;
    return { token, claims };
  } catch {
    return null;
  }
};

/**
 * Gate for signed-in pages.
 *  - route: where to send visitors who are not (or no longer) signed in
 *  - roles: optional list of roles allowed on this page (checked against the
 *           token; the API enforces the same rules, this just avoids showing
 *           the wrong dashboard)
 */
const ProtectedRoute = ({ route, roles, children }) => {
  const session = readSession();

  if (!session) {
    clearSession();
    return <Navigate to={route} replace />;
  }

  if (roles && !roles.includes(session.claims.role)) {
    return <Navigate to={route} replace />;
  }

  return React.cloneElement(children, { token: session.token });
};

export default ProtectedRoute;
