import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuth } from '../utils/adminApi';

interface Admin {
  id: number;
  email: string;
}

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  admin: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        const savedToken = localStorage.getItem('admin_token');
        if (savedToken) {
          setToken(savedToken);
          try {
            const data = await adminAuth.getMe();
            setAdmin(data.admin);
          } catch (error: any) {
            if (error?.response?.status === 401) {
              localStorage.removeItem('admin_token');
              setToken(null);
              setAdmin(null);
            }
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await adminAuth.login(email, password);
    setToken(data.token);
    setAdmin(data.admin);
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', data.token);
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!admin && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};