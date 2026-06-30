import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

const ProtectedRoute = ({route, children }) => {
  const token = Cookies.get("token");

  if (!token) {
    // No token → redirect to login
    return <Navigate to={`${route}`} replace />;
  }

  // Token exists → pass it to children
  return React.cloneElement(children, { token });
};

export default ProtectedRoute;

