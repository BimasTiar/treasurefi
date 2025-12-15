"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { auth } from "../lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  setToken: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Get fresh token
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
      } else {
        setToken(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auto-refresh token setiap 30 menit (PISAH useEffect)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      try {
        const freshToken = await user.getIdToken(true);
        setToken(freshToken);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, loading, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);