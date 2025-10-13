import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/route";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(auth);

  if (!session) {
    redirect("/login"); 
  }

  return <>{children}</>;
}