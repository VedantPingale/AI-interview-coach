import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseService';
import type { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { email: string, password: string }) => Promise<void>;
  register: (credentials: { name: string, email: string, password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const currentUser = await supabase.getUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, []);

  const login = async (credentials: { email: string, password: string }) => {
    const loggedInUser = await supabase.signIn(credentials);
    setUser(loggedInUser);
  };
  
  const register = async (credentials: { name: string, email: string, password: string }) => {
    const newUser = await supabase.signUp(credentials);
    setUser(newUser);
  };

  const logout = () => {
    supabase.signOut();
    setUser(null);
  };

  const isAuthenticated = !!user;

  const value = { isAuthenticated, user, login, register, logout, isLoading };

  return (
    <AuthContext.Provider value={value}>
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
