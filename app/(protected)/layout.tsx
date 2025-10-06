import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/route";
import { Sidebar } from "@/components/ui/Sidebar";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(auth);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="w-full p-4 relative">{children}</main>
    </div>
  );
}
