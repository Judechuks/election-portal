import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./";
import { backendUrl } from "../util";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const stored = localStorage.getItem("nocen_user");
        if (stored) {
          const { userData, accessToken, refreshToken } = JSON.parse(stored);
          console.log("accessToken from Authcontext:", accessToken);
          console.log("refreshToken from Authcontext:", refreshToken);
          setUser(userData);
          return { userData, accessToken, refreshToken };
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("nocen_user");
      }
      return { userData: null, accessToken: null, refreshToken: null };
    };

    initializeAuth();
    setIsLoading(false);
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem(
      "nocen_user",
      JSON.stringify({ userData, accessToken, refreshToken })
    );
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Get tokens directly from localStorage
      const stored = JSON.parse(localStorage.getItem("nocen_user") || "{}");

      // Create a dedicated logout request without token refresh
      await axios.post(
        `${backendUrl}/api/auth/logout/`,
        { refresh: stored.refreshToken },
        {
          headers: {
            Authorization: `Bearer ${stored.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      // Handle 400 errors specifically
      if (error.response?.status === 400) {
        console.log("Token already invalidated, proceeding with logout");
      } else {
        console.error("Logout error:", error.message);
      }
    } finally {
      // Clear auth state regardless of API response
      setUser(null);
      localStorage.removeItem("nocen_user");
      setIsLoading(false);
      navigate("/");
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
