import { useCallback, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../api/base";
import { AuthContext, type LoginType } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const clearSession = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // This call will use the interceptor in base.ts if the token is expired
        const res = await BASE_API.get("/auth/admin/me");
        const admin = res.data.user || res.data.data?.admin;

        if (admin?.role === "Admin") {
          setUser(admin);
          setIsAuthenticated(true);
        } else {
          clearSession();
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
          console.error("Session restoration failed");
          clearSession();
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [clearSession]);

  const login = useCallback(
    async (email: string, password: string, rememberMe: boolean = false) => {
      const res = await BASE_API.post("/auth/admin/login", {
        email,
        password,
        rememberMe,
      });
      const token = res.data.accessToken || res.data.data?.accessToken;
      const admin = res.data.user || res.data.data?.admin;

      if (token) {
        localStorage.setItem("accessToken", token);
        setUser(admin);
        setIsAuthenticated(true);
        navigate("/dashboard", { replace: true });
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      await BASE_API.post("/auth/admin/logout");
    } finally {
      clearSession();
      navigate("/login", { replace: true });
    }
  }, [navigate, clearSession]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
