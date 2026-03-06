import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getCurrentUser, logout as logoutApi } from '../api/auth';
import type { AuthResponse } from '../api/auth';

interface AuthContextType {
  user: AuthResponse | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = (userData: AuthResponse) => {
    setUser(userData);
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.roles.includes('ROLE_ADMIN') || false;
  const isUser = user?.roles.includes('ROLE_USER') || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
