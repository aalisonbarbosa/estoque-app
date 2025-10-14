"use client";

import { getStoreName } from "@/lib/actions/store";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [storeName, setStoreName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const links = [
    { href: "/", title: "Dashboard" },
    { href: "/products", title: "Produtos" },
    { href: "/transactions", title: "Movimentações" },
  ];

  return (
    <>
      {!isOpen && (
        <Menu
          className="cursor-pointer md:hidden absolute z-40 right-4 top-4"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      )}

      <aside
        className={`w-72 bg-white shadow-lg p-4 space-y-4 ${
          isOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"
        } md:sticky fixed top-0 bottom-0 max-md:right-0 max-md:h-screen max-md:w-1/2 transition-transform duration-300 z-50`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">EstoqueApp</h1>
          {isOpen && (
            <X
              className="cursor-pointer md:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          )}
        </div>
        <div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Loja</span>
            <h2 className="text-md font-semibold text-gray-800 capitalize">
              {storeName.length > 0 ? storeName : "Sem nome"}
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
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
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
    </>
  );
};
