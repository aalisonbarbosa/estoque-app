"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function Settings() {
  const { isAdmin } = useAuth();

  if (!isAdmin) redirect("/");
  
  return <h1>settings</h1>;
}
