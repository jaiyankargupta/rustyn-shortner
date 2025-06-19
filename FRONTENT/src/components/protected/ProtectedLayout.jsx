// src/components/ProtectedLayout.jsx
import React from "react";
import App from "../../App.jsx"; // Ensure this path is correct
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <App>
      <Outlet />
      {/* This will render the child routes defined in MainRouter.jsx */}
    </App>
  );
};

export default ProtectedLayout;
