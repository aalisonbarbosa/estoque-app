"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getMovements, getTodayMovements } from "@/lib/actions/movement";

import { MovementTable } from "@/types/types";

import { MovementsTable } from "@/components/movements/MovementsTable";
import { getOutOfStockProducts, getQtdProducts } from "@/lib/actions/product";

export default function Dashboard() {
  const [allMovements, setAllMovements] = useState<MovementTable[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState(0);
  const [todayMovements, setTodayMovements] = useState(0);

  const { data: session } = useSession();

  const storeId = session?.user.storeId!;

  useEffect(() => {
    async function fetchMovements() {
      try {
        const res = (await getMovements(storeId)) ?? [];

        const formatted: MovementTable[] = res.map((m) => ({
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

    async function getDashboardStats() {
      try {
        setTotalProducts(await getQtdProducts(storeId));
        setTodayMovements(await getTodayMovements(storeId));
        setOutOfStockProducts(await getOutOfStockProducts(storeId));
      } catch (err) {
        console.error(err);
      }
    }

    fetchMovements();
    getDashboardStats();
  }, []);

  const movement = allMovements.slice(0, 3);

  return (
    <>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-md p-4 shadow">
            Produtos Cadastrados:
            <span className="font-bold"> {totalProducts}</span>
          </div>
          <div className="bg-white rounded-md p-4 shadow">
            Produtos em Falta:
            <span className="font-bold text-red-500"> {outOfStockProducts}</span>
          </div>
          <div className="bg-white rounded-md p-4 shadow">
            Movimentações Hoje:
            <span className="font-bold"> {todayMovements}</span>
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
