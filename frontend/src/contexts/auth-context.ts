import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// ✅ Định nghĩa interface thay vì any
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>; // ✅ Thay any bằng RegisterData
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);