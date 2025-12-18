import { createContext } from "react";

export interface LoginType {
  id: number;
  name: string;
  email: string;
  role: string;
  rememberMe: boolean;
}

export type AuthContextType = {
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; user: LoginType }>;
  logout: () => Promise<void>;
  user: LoginType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
