"use client";

import { CreateMovementModal } from "@/components/CreateMovementModal";
import { MovementsTable } from "@/components/MovementsTable";
import { PaginationControls } from "@/components/PaginationControls";
import { getMovements } from "@/lib/actions/movements";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Movement {
  productName: string;
  movementType: string;
  quantity: number;
  userName: string;
  date: string;
}

export default function Transactions() {
  const [isVisible, setIsvisible] = useState<boolean>(false);

  const { data: session } = useSession();

  function toggleVisible() {
    setIsvisible((prev) => !prev);
  }

  const [allMovements, setAllMovements] = useState<Movement[]>([]);

  const [inicio, setInicio] = useState(0);
  const [fim, setFim] = useState(4);

  useEffect(() => {
    async function fetchMovements() {
      try {
        const res = (await getMovements(session?.user.storeId!)) ?? [];

        const formatted: Movement[] = res.map((m) => ({
          productName: m.productName,
          movementType: m.movementType,
          quantity: m.quantity,
          userName: m.userName,
          date: `${
            m.date.getDate() +
            "/" +
            `${m.date.getMonth() < 10 && "0"}` +
            m.date.getMonth() +
            "/" +
            m.date.getFullYear()
          }`,
        }));

        setAllMovements(formatted);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMovements();
  }, []);

  const movements: Movement[] = allMovements.slice(inicio, fim);

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
      {isVisible && <CreateMovementModal onToggle={toggleVisible} />}
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Movimentações</h1>
        <button
          onClick={toggleVisible}
          className="bg-stone-500 hover:bg-stone-600 duration-300 text-white p-2 rounded-md cursor-pointer"
        >
          Nova Movimentação
        </button>
        {movements.length === 0 ? (
          <p>Nenhuma movimentação encontrada.</p>
        ) : (
          <div className="bg-white rounded-xl p-2 space-y-4">
            <MovementsTable movements={movements} />
            {allMovements.length > 5 && (
              <PaginationControls onPrev={handlerPrev} onNext={handlerNext} />
            )}
          </div>
        )}
      </section>
    </>
  );
}
