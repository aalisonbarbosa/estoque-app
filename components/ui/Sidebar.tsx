"use client";

import { useAuth } from "@/context/AuthContext";
import { getStoreName } from "@/lib/actions/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const { isAdmin } = useAuth();

  const { data: session } = useSession();
  const pathname = usePathname();

  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    async function fetchStoreName() {
      try {
        const name = await getStoreName(session?.user?.storeId!);
        setStoreName(name);
      } catch (error) {
        console.error("Erro ao buscar nome da loja:", error);
        setStoreName("Erro ao carregar");
      }
    }

    fetchStoreName();
  }, []);

  return (
    <aside className="w-72 bg-white shadow-lg p-4 hidden md:block space-y-4">
      <h1 className="text-2xl font-bold">EstoqueApp</h1>
      <div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Loja</span>
          <h2 className="text-md font-semibold text-gray-800 capitalize">
            {storeName}
          </h2>
        </div>

        <div className="mt-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-100 rounded-xl p-3 shadow-sm">
          <p className="text-sm text-gray-600">Bem-vindo(a),</p>
          <p className="text-md font-semibold text-blue-700 tracking-wide capitalize">
            {session?.user.name || "Sem nome"}
          </p>
        </div>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              href="/"
              className={`block px-3 py-2 rounded-lg transition-colors ${
                pathname === "/"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className={`block px-3 py-2 rounded-lg transition-colors ${
                pathname === "/products"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Produtos
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className={`block px-3 py-2 rounded-lg transition-colors ${
                pathname === "/transactions"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Movimentações
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                href="/settings"
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/settings"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Configurações
              </Link>
            </li>
          )}
          {session && (
            <li>
              <button
                className="cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2"
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
