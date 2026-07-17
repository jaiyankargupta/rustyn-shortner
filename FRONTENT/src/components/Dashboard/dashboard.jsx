import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 min-h-screen text-slate-800">
      <Sidebar />
      
      <div className="flex-1 flex flex-col gap-6">
        <header className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Email: <span className="text-slate-700 font-medium">{user?.email}</span>
          </p>
        </header>

        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 min-h-[400px] shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
