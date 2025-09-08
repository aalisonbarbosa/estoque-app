"use client";
import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

type AuthContextType = {
  role: string | null;
  isAdmin: boolean;
  isEmployee: boolean;
};

const AuthContext = createContext<AuthContextType>({
  role: null,
  isAdmin: false,
  isEmployee: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const role = session?.user?.role ?? null;

  return (
    <AuthContext.Provider
      value={{
        role,
        isAdmin: role === "ADMIN",
        isEmployee: role === "EMPLOYEE",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
