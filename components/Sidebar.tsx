"use client";

import { useAuth } from "@/context/AuthContext";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const Sidebar = () => {
  const { isAdmin } = useAuth();
  return (
    <aside className="w-64 bg-white shadow-lg p-4 hidden md:block">
      <h1 className="text-2xl font-bold mb-8">EstoqueApp</h1>
      <nav className="space-y-4">
        <Link href="/" className="block text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link
          href="/products"
          className="block text-gray-700 hover:text-blue-600"
        >
          Produtos
        </Link>
        <Link
          href="/transactions"
          className="block text-gray-700 hover:text-blue-600"
        >
          Movimentações
        </Link>
        <Link
          href="/reports"
          className="block text-gray-700 hover:text-blue-600"
        >
          Relatórios
        </Link>
        {isAdmin && (
          <Link
            href="/settings"
            className="block text-gray-700 hover:text-blue-600"
          >
            Configurações
          </Link>
        )}
      </nav>

      {/* <button onClick={() => signOut()}>logout</button> */}
    </aside>
  );
};
