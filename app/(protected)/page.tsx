"use client";

import { MovementsTable } from "@/components/MovementsTable";
import { PaginationControls } from "@/components/PaginationControls";
import { useState } from "react";

type Movement = {
  product: string;
  type: string;
  qtd: number;
  data: string;
  user: string;
};

export default function Dashboard() {
  const allMovements: Movement[] = [
    {
      product: "Arroz",
      type: "Entrada",
      qtd: 10,
      data: "10/09",
      user: "alison",
    },
    {
      product: "Feijão",
      type: "Saida",
      qtd: 2,
      data: "15/09",
      user: "vitória",
    },
    {
      product: "Arroz",
      type: "Entrada",
      qtd: 10,
      data: "10/09",
      user: "renan",
    },
    {
      product: "Feijão",
      type: "Saida",
      qtd: 2,
      data: "15/09",
      user: "ewellyn",
    },
    {
      product: "Arroz",
      type: "Entrada",
      qtd: 10,
      data: "10/09",
      user: "amanda",
    },
    {
      product: "Feijão",
      type: "Saida",
      qtd: 2,
      data: "15/09",
      user: "xuxu",
    },
    {
      product: "Arroz",
      type: "Entrada",
      qtd: 10,
      data: "10/09",
      user: "sophio",
    },
  ];

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
          <MovementsTable movements={movement} />
        </div>
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          [ Gráfico Entradas vs Saídas ]
        </div>
      </section>
    </>
  );
}
