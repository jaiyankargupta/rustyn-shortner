import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const token = Cookies.get("accessToken");

  const isAuthenticated = Boolean(token); // true if token exists
  const location = useLocation(); // track current route

  return isAuthenticated ? (
    <Outlet /> //use Outlet to render child routes
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
