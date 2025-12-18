import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { AuthContext, type LoginType } from "./AuthContext";
import { BASE_API } from "../api/base";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasInitialized = useRef(false);

  const isAuthenticated = Boolean(user);

  const clearSession = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
  }, []);

  // Restore session on app load / page refresh
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await BASE_API.get("/auth/admin/me");

        // Your API returns: { success: true, data: { id, name, email, role, ... } }
        const userData = res.data?.data;

        if (userData && userData.role) {
          setUser(userData);
        } else {
          console.warn("Invalid user data structure from /me", res.data);
          clearSession();
        }
      } catch (error) {
        console.error("Failed to load user on refresh:", error);
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [clearSession]);

  const login = useCallback(
    async (email: string, password: string, rememberMe = false) => {
      try {
        const response = await BASE_API.post("/auth/admin/login", {
          email,
          password,
          rememberMe,
        });

        // Login response: response.data.data.accessToken
        const accessToken = response.data?.data?.accessToken;
        if (!accessToken) {
          throw new Error("No access token received from login");
        }

        localStorage.setItem("accessToken", accessToken);

        // Fetch current admin profile
        const res = await BASE_API.get("/auth/admin/me");

        // Critical fix: extract the actual user from res.data.data
        const userData = res.data?.data;

        if (!userData || !userData.role) {
          throw new Error("Invalid user profile data received");
        }

        setUser(userData);

        return { success: true, user: userData };
      } catch (error) {
        clearSession();
        throw error;
      }
    },
    [clearSession]
  );

  const logout = useCallback(async () => {
    try {
      await BASE_API.post("/auth/admin/logout");
    } catch (error) {
      console.warn("Logout endpoint failed (non-critical):", error);
    } finally {
      clearSession();
    }
  }, [clearSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
