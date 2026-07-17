import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-2 md:p-4 w-full md:w-64 flex-shrink-0 h-fit shadow-sm">
      <ul className="flex flex-row md:flex-col gap-1 md:space-y-1 w-full overflow-x-auto md:overflow-x-visible justify-between md:justify-start">
        <li className="flex-1 md:flex-none">
          <Link
            to="/dashboard"
            className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-[10px] xs:text-xs font-semibold transition duration-150 cursor-pointer ${currentPath === "/dashboard" || currentPath === "/dashboard/"
                ? "bg-indigo-50 text-indigo-600 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
            <span className="hidden xxs:inline">Overview</span>
          </Link>
        </li>
        <li className="flex-1 md:flex-none">
          <Link
            to="/dashboard/analytics"
            className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-[10px] xs:text-xs font-semibold transition duration-150 cursor-pointer ${currentPath === "/dashboard/analytics"
                ? "bg-indigo-50 text-indigo-600 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="hidden xxs:inline">Analytics</span>
          </Link>
        </li>
        <li className="flex-1 md:flex-none">
          <Link
            to="/dashboard/settings"
            className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-[10px] xs:text-xs font-semibold transition duration-150 cursor-pointer ${currentPath === "/dashboard/settings"
                ? "bg-indigo-50 text-indigo-600 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden xxs:inline">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
