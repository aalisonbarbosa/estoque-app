"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getMovements } from "@/lib/actions/movement";

import { MovementsTable } from "@/components/MovementsTable";

interface Movement {
  productId: string;
  productName: string;
  movementType: string;
  quantity: number;
  userName: string; 
  date: string;
  storeId: string;
}

export default function Dashboard() {
  const [allMovements, setAllMovements] = useState<Movement[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchMovements() {
      try {
        const res = (await getMovements(session?.user.storeId!)) ?? [];

        const formatted: Movement[] = res.map((m) => ({
          productId: m.productId,
          productName: m.product.name!,
          movementType: m.movementType,
          quantity: m.quantity,
          userName: m.user.name!,
          date: `${
            m.date.getDate() +
            "/" +
            `${m.date.getMonth() < 10 && "0"}` +
            m.date.getMonth() +
            "/" +
            m.date.getFullYear()
          }`,
          storeId: m.storeId,
        }));

        setAllMovements(formatted);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMovements();
  }, []);

  const movement = allMovements.slice(0, 3);

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="px-4 py-2 max-w-40 rounded-md shadow"
        />
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      </header>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-md p-4 shadow">
            Produtos Cadastrados: <span className="font-bold">120</span>
          </div>
          <div className="bg-white rounded-md p-4 shadow">
            Produtos em Falta: <span className="font-bold">5</span>
          </div>
          <div className="bg-white rounded-md p-4 shadow">
            Movimentações Hoje: <span className="font-bold">18</span>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 shadow space-y-4">
          <h3 className="font-semibold">Últimas Movimentações</h3>
          {movement.length === 0 ? (
            <p>Nenhuma movimentação encontrada.</p>
          ) : (
            <MovementsTable movements={movement} />
          )}
        </div>
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          [ Gráfico Entradas vs Saídas ]
        </div>
      </section>
    </>
  );
}
