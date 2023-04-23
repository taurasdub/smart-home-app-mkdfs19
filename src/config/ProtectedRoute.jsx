import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = UserAuth();

  return user ? children : <Navigate to="/signin" />;
}
