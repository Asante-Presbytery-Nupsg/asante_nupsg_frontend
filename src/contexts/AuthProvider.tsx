import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_API } from "../api/base";
import { AuthContext, type LoginType } from "./AuthContext";
import { AxiosError } from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<LoginType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await BASE_API.get("/auth/me", { withCredentials: true });
        const loggedInUser: LoginType = res.data.user;

        if (loggedInUser.role === "Admin") {
          setUser(loggedInUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          navigate("/login", { replace: true });
        }
      } catch (err: unknown) {
        setUser(null);
        setIsAuthenticated(false);
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            navigate("/login", { replace: true });
          }
        }
      } finally {
        setLoading(false);
      }
    };

    const publicRoutes = [
      "/login",
      "/forgot-password",
      "/reset-password",
      "/verify-email",
      "/",
    ];
    if (!publicRoutes.includes(location.pathname)) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [location.pathname, navigate]);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ) => {
    try {
      const res = await BASE_API.post(
        "/auth/admin/login",
        { email, password, rememberMe },
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", res.data.accessToken);

      const { data } = await BASE_API.get("/auth/admin/me", {
        withCredentials: true,
      });
      const loggedInUser: LoginType = data.user;

      if (loggedInUser.role === "Admin") {
        setUser(loggedInUser);
        setIsAuthenticated(true);
        navigate("/dashboard", { replace: true });
      } else {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await BASE_API.post("/auth/admin/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
