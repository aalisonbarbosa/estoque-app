import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Sidebar } from "@/components/ui/Sidebar";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-screen bg-gray-100 flex overflow-x-hidden">
      <Sidebar />
      <main className="w-full p-4 relative min-h-min">{children}</main>
    </div>
  );
}
