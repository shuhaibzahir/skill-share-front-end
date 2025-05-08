"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole } from "./types";
import { mockUsers } from "./mock-data";
import { userSignIn, userSignUp } from "@/api/userService";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data:any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage (simulating persistence)
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to validate credentials
      try {
        const response = await userSignIn(email, password);
        if (response.status === 200) {
          const user = response.data;
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error signing in:", error);
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data:any) => {
    // Simulate API call
    setIsLoading(true);
    try {
      // Check if user exists
      const response = await userSignUp(data)
       
      localStorage.setItem("user", JSON.stringify(response.data));
      return true;
    } 
    catch(error){
      console.error("Error signing up:", error);
      return false;
    }
    finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}