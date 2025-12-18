import axios from "axios";

const BASE_URL = "https://asante-nupsg-backend.onrender.com/api/v1";

export const BASE_API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ----------------------
// REQUEST INTERCEPTOR
// ----------------------
BASE_API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------
// RESPONSE INTERCEPTOR
// ----------------------
BASE_API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const message = error.response?.data?.message?.toLowerCase() || "";
    const isTokenExpired =
      (error.response?.status === 401 || error.response?.status === 403) &&
      (message.includes("expired") || message.includes("invalid"));

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshClient = axios.create({
          baseURL: BASE_URL,
          withCredentials: true,
        });

        const { data } = await refreshClient.post("/auth/refresh");

        const newAccessToken =
          data?.data?.accessToken || data?.accessToken || data;

        if (!newAccessToken) {
          throw new Error("No new access token received");
        }

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with new token
        return BASE_API(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        // Optional: force logout / redirect
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
