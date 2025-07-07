import axios from "axios";
export const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://213.199.34.226";
export const webSocketUrl =
  import.meta.env.VITE_WEBSOCKET_URL || "ws://213.199.34.226";

// Post Request with Authentication
export const postWithAuth = async (endpoint, data) => {
  let stored = JSON.parse(localStorage.getItem("nocen_user") || {});
  let accessToken = stored?.accessToken;
  const refreshToken = stored?.refreshToken;
  // console.log("accessToken before post request:", accessToken);

  if (!accessToken) throw new Error("Access token not available");

  try {
    const response = await axios.post(`${backendUrl}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    // If unauthorized, try refreshing token
    if (err.response?.status === 401 && refreshToken) {
      try {
        const refreshResponse = await axios.post(
          `${backendUrl}/auth/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = refreshResponse.data.access;
        // console.log("new accessToken:", newAccessToken);

        // Update localStorage with new token
        const updatedUser = {
          ...stored,
          accessToken: newAccessToken,
        };
        localStorage.setItem("nocen_user", JSON.stringify(updatedUser));

        // Retry original request with new token
        const retryResponse = await axios.post(
          `${backendUrl}${endpoint}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        return retryResponse.data;
      } catch (refreshErr) {
        // Refresh also failed — logout
        localStorage.removeItem("nocen_user");
        console.log("Session expired!", refreshErr);
        // window.location.href = "/signin";
        throw new Error("Session expired. Please log in again.");
      }
    }

    // Any other error
    throw err;
  }
};

// Get Request with Authentication
export const getWithAuth = async (endpoint) => {
  let stored = JSON.parse(localStorage.getItem("nocen_user") || {});
  let accessToken = stored?.accessToken;
  const refreshToken = stored?.refreshToken;
  // console.log("accessToken before get request:", accessToken);

  if (!accessToken) throw new Error("Access token not available");

  try {
    const response = await axios.get(`${backendUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    // User is not enlisted for this election
    if (err.response?.status === 404) {
      console.log("Error:", err);
      throw new Error("Not found");
    }
    // If unauthorized, try refreshing token
    if (err.response?.status === 401 && refreshToken) {
      try {
        const refreshResponse = await axios.post(
          `${backendUrl}/api/auth/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = refreshResponse.data.access;
        // console.log("new accessToken:", newAccessToken);

        // Update localStorage
        const updatedUser = {
          ...stored,
          accessToken: newAccessToken,
        };
        localStorage.setItem("nocen_user", JSON.stringify(updatedUser));

        // Retry original request with new token
        const retryResponse = await axios.get(`${backendUrl}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            "Content-Type": "application/json",
          },
        });
        return retryResponse.data;
      } catch (refreshErr) {
        // Refresh also failed — logout
        localStorage.removeItem("nocen_user");
        console.log("Session expired!", refreshErr);
        // window.location.href = "/signin";
        throw new Error("Session expired. Please log in again.");
      }
    }

    // Any other error
    throw err;
  }
};
