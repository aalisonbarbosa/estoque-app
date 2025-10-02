"use client";

import { useAuth } from "@/context/AuthContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Sidebar = () => {
  const { isAdmin } = useAuth();

  const { data: session } = useSession();

  return (
    <aside className="w-72 bg-white shadow-lg p-4 hidden md:block">
      <h1 className="text-2xl font-bold mb-8">EstoqueApp</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/" className="block text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="block text-gray-700 hover:text-blue-600"
            >
              Produtos
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className="block text-gray-700 hover:text-blue-600"
            >
              Movimentações
            </Link>
          </li>
          <li>
            <Link
              href="/reports"
              className="block text-gray-700 hover:text-blue-600"
            >
              Relatórios
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                href="/settings"
                className="block text-gray-700 hover:text-blue-600"
              >
                Configurações
              </Link>
            </li>
          )}
          {session && (
            <li>
              <button
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => signOut()}
              >
                Sair
              </button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};
