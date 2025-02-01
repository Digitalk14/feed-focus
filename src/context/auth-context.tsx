"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "@/utils";
import { toast } from "react-toastify";

interface AuthContextType {
  user: any | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { user, userError } = await getUser();
      if (userError) {
        toast.error("Failed to fetch user");
      }
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
