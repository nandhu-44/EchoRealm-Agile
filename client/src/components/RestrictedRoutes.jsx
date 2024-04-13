import React from "react";
import { Navigate } from "react-router-dom";

const RestrictedRoutes = ({ children }) => {
  const userData = localStorage.getItem("user");
  return userData ? children : <Navigate to="/signin" />;
};

export default RestrictedRoutes;
