import axios from "axios";

const BASE_URL = "https://asante-nupsg-backend.onrender.com/api/v1";

export const BASE_API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // needed for refresh token cookie
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
      message.includes("expired");

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use a separate client to avoid infinite loop
        const refreshClient = axios.create({
          baseURL: BASE_URL,
          withCredentials: true,
        });

        const { data } = await refreshClient.post("/auth/refresh");

        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return BASE_API(originalRequest);
      } catch {
        localStorage.removeItem("accessToken");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
