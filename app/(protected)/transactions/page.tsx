"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getMovements } from "@/lib/actions/movement";

import { CreateMovementModal } from "@/components/movements/CreateMovementModal";
import { MovementsTable } from "@/components/movements/MovementsTable";
import { TablePagination } from "@/components/ui/TablePagination";
import { MovementTable } from "@/types/types";
import { Loading } from "@/components/ui/Loading";
import { Popup } from "@/components/ui/Popup";
import { Button } from "@/components/ui/Button";
import { usePopup } from "@/hooks/popup";

export default function Transactions() {
  const [allMovements, setAllMovements] = useState<MovementTable[]>([]);
  const { data: session } = useSession();

  const [isVisible, setIsvisible] = useState<boolean>(false);

  const [inicio, setInicio] = useState(0);
  const [fim, setFim] = useState(4);

  const [loading, setLoading] = useState<boolean>(true);

  const [refresh, setRefresh] = useState(0);

  const { isPopupVisible, popupMessage, popupType, notifyPopup } = usePopup();

  useEffect(() => {
    async function fetchMovements() {
      try {
        setLoading(true);
        const res = (await getMovements(session?.user.storeId!)) ?? [];

        const formatted: MovementTable[] = res.map((m) => ({
          productId: m.productId,
          productName: m.product.name!,
          movementType: m.movementType,
          quantity: m.quantity,
          userId: m.userId,
          userName: m.user.name!,
          date: `${m.date.getDate()}/${String(m.date.getMonth() + 1).padStart(
            2,
            "0"
          )}/${m.date.getFullYear()}`,
        }));

        setAllMovements(formatted);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMovements();
  }, [session?.user.storeId, refresh]);

  const movements: MovementTable[] = allMovements.slice(inicio, fim);

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

  function toggleVisible() {
    setIsvisible((prev) => !prev);
  }

  if (loading) {
    return (
      <div className="h-full">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {isVisible && (
        <CreateMovementModal
          onToggle={toggleVisible}
          onCreated={() => setRefresh((prev) => prev + 1)}
          onPopup={notifyPopup}
        />
      )}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Movimentações</h1>
        <Button label="Nova movimentação" onClick={toggleVisible} />

        {movements.length === 0 ? (
          <p>Nenhuma movimentação encontrada.</p>
        ) : (
          <div className="bg-white rounded-xl p-2 space-y-4">
            <MovementsTable movements={movements} />
            {allMovements.length > 5 && (
              <TablePagination onPrev={handlerPrev} onNext={handlerNext} />
            )}
          </div>
        )}
      </div>
      <Popup
        isPopupVisible={isPopupVisible}
        message={popupMessage}
        type={popupType}
      />
    </>
  );
}
