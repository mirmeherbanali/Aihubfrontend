"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AuthToggleContextType = {
  isLogin: boolean;
  setIsLogin: (val: boolean) => void;
};

const AuthToggleContext = createContext<AuthToggleContextType | undefined>(undefined);

export const AuthToggleProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthToggleContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthToggleContext.Provider>
  );
};

export const useAuthToggle = () => {
  const context = useContext(AuthToggleContext);
  if (!context) throw new Error("useAuthToggle must be used inside AuthToggleProvider");
  return context;
};
