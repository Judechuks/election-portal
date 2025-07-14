import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { HiOutlineMoon } from "react-icons/hi2";
import { AcademicCapIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useAuth, useTheme } from "../../context";
import ThemeToggleButton from "../util/ThemeToggleButton";
import logo from "../../assets/logo.png";

const MainNav = () => {
  const { toggleTheme, theme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const isActive = (path) => {
    const currentPath = location.pathname;

    if (path === "/") {
      return currentPath === "/";
    }

    return currentPath.startsWith(path);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="NOCEN Election portal"
                className="h-12 w-16 logo"
              />
              <span className="ml-2 text-sm font-bold text-gray-600 dark:text-gray-200">
                <div>NOCEN ELECTION</div>
                <div>PORTAL</div>
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/")
                    ? "border-blue-500 text-blue-700"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 hover:dark:text-gray-500"
                }`}
              >
                Home
              </Link>
              <Link
                to="/results"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/results")
                    ? "border-blue-500 text-blue-700"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700  hover:dark:text-gray-500"
                }`}
              >
                Results
              </Link>
              <Link
                to="/live-results"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive("/live-results")
                    ? "border-blue-500 text-blue-700"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700  hover:dark:text-gray-500"
                }`}
              >
                Live Results
              </Link>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center gap-3 items-center">
            <div className="theme">
              <ThemeToggleButton />
            </div>
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/signin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive("/")
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Home
          </Link>
          <Link
            to="/results"
            className={`hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive("/results")
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Results
          </Link>
          <Link
            to="/live-results"
            className={`hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive("/live-results")
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Live Results
          </Link>
          {user && (
            <Link
              to={user.role === "admin" ? "/admin" : "/student"}
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Dashboard
            </Link>
          )}
          <button
            type="button"
            className="w-full border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-left"
            onClick={toggleTheme}
          >
            {theme == "light" ? (
              <span className="flex gap-2 items-center">
                Dark Theme
                <HiOutlineMoon />
              </span>
            ) : (
              <span className="flex gap-2 items-center">
                Light Theme
                <IoSunnyOutline />
              </span>
            )}
          </button>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="px-4">
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="px-4 space-y-3">
              <Link
                to="/signin"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
