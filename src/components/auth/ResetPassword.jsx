import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import Input from "../form/input/InputField";
import { useAuth } from "../../context";
import { backendUrl } from "../../util";
import logo from "../../assets/logo.png";

const ResetPassword = () => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    if (!credentials.username.trim() && !credentials.password.trim()) {
      setError("Username and password are required");
      return false;
    }
    if (!credentials.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!credentials.password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setError("");
        setIsLoading(true);
        const response = await fetch(`${backendUrl}/api/auth/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          await login(
            responseData.user,
            responseData.access,
            responseData.refresh
          );
          setIsLoading(false);
          navigate("/redirect");
        } else {
          setIsLoading(false);
          setError("Invalid credentials. Please try again.");
        }
      } catch (error) {
        console.log("Login error: ", error);
        setError("Login error. Could be your network");
        setIsLoading(false);
      } finally {
        setIsLoading(false); // Stop on error
      }
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Welcome Column */}
      <article className="w-full hidden lg:w-1/2 bg-blue-900 dark:bg-blue-800 text-white p-8 md:p-12 lg:p-16 lg:flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="NOCEN Election portal" className="h-12 w-16" />
            <span className="ml-2 text-2xl font-bold text-gray-200">
              NOCEN ELECTION PORTAL
            </span>
          </Link>
          <p className="text-blue-100 dark:text-blue-200 mt-4 mb-8">
            Welcome to our secure election platform. Cast your vote for the
            future leaders of our student community.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 flex-shrink-0 text-blue-200 dark:text-blue-100 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-blue-100 dark:text-blue-200">
                  Secure Voting
                </h3>
                <p className="text-blue-200 dark:text-blue-300 text-sm">
                  Your vote is anonymous and encrypted. We ensure the integrity
                  of the election process.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <UsersIcon className="h-6 w-6 flex-shrink-0 text-blue-200 dark:text-blue-100 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-blue-100 dark:text-blue-200">
                  Student Leadership
                </h3>
                <p className="text-blue-200 dark:text-blue-300 text-sm">
                  Shape the future of our student community by participating in
                  these important elections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Login Form Column */}
      <article className="w-full py-8 px-4 sm:px-8 min-h-screen lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden py-8 px-4 sm:px-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Reset Password
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Enter new password to reset your password, and keep your account
              secured
            </p>
          </div>

          {error && (
            <section className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border-l-4 border-red-500 p-4">
              <div className="flex">
                <article className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </article>
                <article className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {error}
                  </p>
                </article>
              </div>
            </section>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <article>
              <label
                htmlFor="username"
                className="inline-block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                College ID
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className=""
                placeholder="Enter your username"
              />
            </article>

            <article>
              <label
                htmlFor="password"
                className="inline-block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  className="pr-[62px]"
                  id="password"
                  name="password"
                  value={credentials.password}
                  placeholder="••••••••"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 border-l border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaRegEye className="size-5" />
                  ) : (
                    <FaRegEyeSlash className="size-5" />
                  )}
                </button>
              </div>
            </article>

            <article>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center mt-8 mb-6 py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </article>
          </form>
        </div>
      </article>
    </section>
  );
};

export default ResetPassword;
