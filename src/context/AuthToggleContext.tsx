"use client";
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface AuthToggleContextType {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const AuthToggleContext = createContext<AuthToggleContextType | undefined>(undefined);

export function AuthToggleProvider({ children }: { children: React.ReactNode }) {
  const [isLogin, setLogin] = useState(true);
  
  // Memoize the setter function
  const setIsLogin = useCallback((value: boolean) => {
    setLogin(value);
  }, []);

  // Memoize the context value
  const value = useMemo(() => ({
    isLogin,
    setIsLogin
  }), [isLogin, setIsLogin]);

  return (
    <AuthToggleContext.Provider value={value}>
      {children}
    </AuthToggleContext.Provider>
  );
}

export function useAuthToggle() {
  const context = useContext(AuthToggleContext);
  if (context === undefined) {
    throw new Error('useAuthToggle must be used within an AuthToggleProvider');
  }
  return context;
}