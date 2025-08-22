// ProtectedRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: JSX.Element;
  role: string; // expected role: "Admin" | "User"
}

interface DecodedToken {
  role: string;
  exp: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    // check expiration
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    // check role
    if (decoded.role !== role) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
