

import React from "react";
import { Navigate } from "react-router-dom";

const DeveloperProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("developerToken");

  if (!token) {
    return <Navigate to="/developerLogin" replace />;
  }

  return children;
};

export default DeveloperProtectedRoute;
