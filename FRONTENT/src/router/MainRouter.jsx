// src/router/MainRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/pages/Home";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import ProtectedLayout from "../components/protected/ProtectedLayout";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";

import Overview from "../components/Dashboard/overview";
import Analytics from "../components/Dashboard/analytics";
import Settings from "../components/Dashboard/setting";
import DashboardLayout from "../components/Dashboard/dashboard";
import Profile from "../components/user/profile";
import AboutUs from "../components/pages/aboutUs";

const MainRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="*"
          element={
            <h1 className="text-red-500 text-center text-4xl mt-12 min-h-screen">
              Page Not Found
            </h1>
          }
        />
      </Route>
      {/* Protected routes with layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          {/* Nested routes for dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} /> {/* default /dashboard */}
            <Route element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="user/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRouter;
