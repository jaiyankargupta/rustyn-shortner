import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <header className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Manage your links here.</p>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
