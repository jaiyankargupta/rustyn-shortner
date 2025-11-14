import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import { useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);

  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    // Check if user is logged in based on user data from context
    const checkLoginStatus = () => {
      const hasUserData = user && user.email && user.name;
      setIsLoggedIn(hasUserData);
    };
    checkLoginStatus();
  }, [user, location]);
  return (
    <header className="bg-blue-900 py-7 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold">
            <Link to="/" className="hover:text-blue-400">
              RustShortner
            </Link>
          </span>
        </div>
        <nav className="flex space-x-6">
          {
            <Link
              to="/"
              className={`hover:text-blue-400 font-medium  ${
                location.pathname === "/" ? "border-b-2 border-blue-400" : ""
              }`}
            >
              Home
            </Link>
          }

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className={`hover:text-blue-400 font-medium  ${
                  location.pathname === "/dashboard"
                    ? "border-b-2 border-blue-400"
                    : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/about"
                className={`hover:text-blue-400 font-medium  ${
                  location.pathname === "/about"
                    ? " border-b-2 border-blue-400"
                    : ""
                }`}
              >
                About Us
              </Link>

              <div>
                <button
                  onMouseEnter={() => setShowProfileMenu(true)}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="ml-2 text-white focus:outline-none"
                >
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/user.png"
                    alt="Profile"
                    className="h-6 w-6 inline-block"
                  />
                </button>
                {showProfileMenu && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg hover:bg-gray-100"
                    onMouseLeave={() => setShowProfileMenu(false)}
                  >
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/user/profile"
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/settings"
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={async () => {
                            Cookies.remove("accessToken");
                            setIsLoggedIn(false);
                            // Clear user data by making a logout request or clearing context
                            navigation("/");
                            // Reload page to reset state
                            window.location.reload();
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/signin"
              className={`hover:text-blue-400 font-medium ${
                location.pathname === "/signin"
                  ? "border-b-2 border-blue-400"
                  : ""
              }`}
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
