import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = React.useState(location.pathname);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-64">
      <ul className="space-y-3">
        <li>
          <Link
            onClick={() => setCurrentPath("/dashboard")}
            to="/dashboard"
            className={`block px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-600 transition-colors ${
              currentPath === "/dashboard" ? "bg-blue-100 text-blue-600" : ""
            }`}
          >
            Overview
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setCurrentPath("/dashboard/analytics")}
            to="/dashboard/analytics"
            className={`block px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-600 transition-colors ${
              currentPath === "/dashboard/analytics"
                ? "bg-blue-100 text-blue-600"
                : ""
            }`}
          >
            Analytics
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setCurrentPath("/dashboard/settings")}
            to="/dashboard/settings"
            className={`block px-3 py-2 rounded hover:bg-blue-100 hover:text-blue-600 transition-colors ${
              currentPath === "/dashboard/settings"
                ? "bg-blue-100 text-blue-600"
                : ""
            }`}
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
