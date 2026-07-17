import React, { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasUserData = user && user.email && user.name;
    setIsLoggedIn(hasUserData);
  }, [user, location]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 text-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/image.png" alt="Logo" className="w-7 h-7 object-contain" />
            <span className="text-lg font-bold tracking-tight text-slate-900">
              RustynShortner
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 relative">
          <Link
            to="/"
            className={`text-sm font-medium transition duration-150 hover:text-indigo-600 ${location.pathname === "/" ? "text-indigo-600" : "text-slate-500"
              }`}
          >
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition duration-150 hover:text-indigo-600 ${location.pathname.startsWith("/dashboard")
                  ? "text-indigo-600"
                  : "text-slate-500"
                  }`}
              >
                Dashboard
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition duration-150 hover:text-indigo-600 ${location.pathname === "/about"
                  ? "text-indigo-600"
                  : "text-slate-500"
                  }`}
              >
                About Us
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition duration-150 cursor-pointer focus:outline-none"
                >
                  <div className="w-5.5 h-5.5 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold uppercase border border-indigo-100">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-xs font-medium text-slate-600 max-w-[100px] truncate hidden sm:inline">
                    {user?.name}
                  </span>
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>

                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 overflow-hidden">
                      <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                        <p className="text-[10px] text-slate-400">Signed in as</p>
                        <p className="text-xs font-semibold text-slate-700 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/user/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="block px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 transition duration-150"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="block px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 transition duration-150"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition duration-150 border-t border-slate-100 cursor-pointer font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/signin"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition duration-150 cursor-pointer shadow-sm"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
