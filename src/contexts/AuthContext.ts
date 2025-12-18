import { createContext } from "react";

export interface LoginType {
  id: number;
  name: string;
  email: string;
  role: string;
}

export type AuthContextType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  user: LoginType | null;
  isAuthenticated: boolean;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
