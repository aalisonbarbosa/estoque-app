import { prisma } from "@/lib/prisma";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { auth } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = (await getServerSession(auth)) as Session & {
    user: { id: string; role: string; email: string };
  };

  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, role: true },
  });

  return (
    <div>
      <h1>Estoque app</h1>
      {JSON.stringify(user)}
    </div>
  );
}
