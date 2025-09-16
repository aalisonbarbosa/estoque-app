import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; import bcrypt from "bcrypt";
export const auth = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "your@email.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null;

      const user = await prisma.user.findUnique({ where: { email: credentials.email }, });
      if (!user) return null;

      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (!isValid) return null;

      return {
        id: user.id!,
        name: user.name!,
        email: user.email!,
        role: user.role!,
        storeId: user.storeId!
      };
    },
  }),],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.role = user.role ?? "EMPLOYEE";
        token.storeId = user.storeId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "EMPLOYEE";
        session.user.storeId = token.storeId as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt", },
  pages: { signIn: "/login", },
});

export { auth as GET, auth as POST };