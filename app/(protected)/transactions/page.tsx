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

export default function Transactions() {
  const [isVisible, setIsvisible] = useState<boolean>(false);

  function toggleVisible() {
    setIsvisible((prev) => !prev);
  }

  const [inicio, setInicio] = useState(0);
  const [fim, setFim] = useState(4);

  const movements = allMovements.slice(inicio, fim);

  function handlerPrev() {
    if (inicio > 0) {
      setInicio(inicio - 5);
      setFim(fim - 5);
    }
  }

  function handlerNext() {
    if (fim < allMovements.length) {
      setInicio(inicio + 5);
      setFim(fim + 5);
    }
  }

  return (
    <>
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Movimentações</h1>
        <button
          onClick={toggleVisible}
          className="bg-stone-500 hover:bg-stone-600 duration-300 text-white p-2 rounded-md cursor-pointer"
        >
          Nova Movimentação
        </button>
        <div className="bg-white rounded-xl p-2 space-y-4">
          {movements.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            <>
              <MovementsTable movements={movements} />
              {allMovements.length > 5 && (
                <PaginationControls onPrev={handlerPrev} onNext={handlerNext} />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
