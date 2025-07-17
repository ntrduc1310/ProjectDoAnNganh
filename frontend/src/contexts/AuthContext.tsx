import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './auth-context';
import type { User, RegisterData } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      if (!email || !password) {
        throw new Error('Email và password là bắt buộc');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        name: 'Nguyễn Trọng Đức',
        email,
        role: 'admin'
      };
      
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setLoading(true);
      
      // Validate data
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('Tất cả các trường là bắt buộc');
      }
      
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Mật khẩu xác nhận không khớp');
      }
      
      // TODO: Implement actual API call
      console.log('Register data:', userData);
      
      // Simulate registration success
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'user'
      };
      
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}