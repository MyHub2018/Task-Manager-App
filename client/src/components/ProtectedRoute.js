import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
  const token = localStorage.getItem("token");
  return token ? component : <Navigate to="/login" />;
};

export default ProtectedRoute;
