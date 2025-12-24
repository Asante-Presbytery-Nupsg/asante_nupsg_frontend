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
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

BASE_API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't attempt refresh for auth endpoints - RETURN EARLY
    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/forgot-password") ||
      originalRequest.url?.includes("/auth/reset-password");

    if (isAuthEndpoint) {
      return Promise.reject(error);
    }

    const message = error.response?.data?.message?.toLowerCase() || "";
    const status = error.response?.status;

    const isTokenError =
      (status === 401 || status === 403) &&
      (message.includes("token expired") ||
        message.includes("token is expired") ||
        message.includes("token invalid") ||
        message.includes("invalid token") ||
        message.includes("jwt expired") ||
        message.includes("jwt malformed") ||
        message.includes("no token provided") ||
        message.includes("authentication required")) &&
      // Explicitly exclude credential-related errors
      !message.includes("credentials") &&
      !message.includes("password") &&
      !message.includes("email");

    if (isTokenError && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return BASE_API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshClient = axios.create({
          baseURL: BASE_URL,
          withCredentials: true,
        });

        const { data } = await refreshClient.post("/auth/refresh");

        const newAccessToken =
          data?.data?.accessToken || data?.accessToken || data?.token;

        if (!newAccessToken) {
          throw new Error("No new access token received from refresh");
        }

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        // Retry the original request with new token
        return BASE_API(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");

        if (!window.location.pathname.includes("/login")) {
          console.log("Redirecting to login...");
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
