"use client";
import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

type AuthContextType = {
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({ isAdmin: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const role = session?.user?.role ?? null;

  return (
    <AuthContext.Provider
      value={{
        isAdmin: role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
