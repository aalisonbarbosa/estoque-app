"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { registerMovement } from "@/lib/actions/movement";
import { getProducts } from "@/lib/actions/product";

import { MovementSchema, movementSchema } from "@/lib/schemas/movement";

import { MovementDB, Product } from "@/types/types";

type Props = {
  onToggle: () => void;
  onCreated: () => void;
  onPopup: (message: string, type: "success" | "error") => void;
};

export const CreateMovementModal = ({
  onToggle,
  onCreated,
  onPopup,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(movementSchema),
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const storeId = session?.user.storeId!;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = (await getProducts(storeId)) ?? [];

        const formatted: Product[] = res.map((p) => ({
          id: p.id,
          name: p.name,
          quantity: p.quantity,
        }));

        setProducts(formatted);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();
  }, []);

  async function onSubmit(formData: MovementSchema) {
    try {
      setLoading(true);
      if (!session?.user.storeId || !session?.user.id)
        throw new Error("User ID ou store ID não encontrado");

      const existingQuantity = products.find(
        (product) => product.id === formData.productId
      )?.quantity;

      if (existingQuantity === undefined) {
        setError("Produto não encontrado");
        return;
      }

      const updatedQuantity =
        formData.movementType === "income"
          ? existingQuantity + formData.quantity
          : existingQuantity - formData.quantity;

      if (updatedQuantity < 0) {
        setError("Quantidade insuficiente em estoque");
        return;
      }

      const movementData: MovementDB = {
        ...formData,
        userId: session.user.id,
        storeId: session.user.storeId,
      };

      await registerMovement(movementData, updatedQuantity);

      onCreated();
      onToggle();
      onPopup("Movimentação criada!", "success");
    } catch (err) {
      console.error(err);
      onPopup("Error ao criar movimentação!", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute top-1/2 left-1/2 w-96 p-4 space-y-4 bg-white rounded-xl z-20 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-xl font-bold">Nova movimentação</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <select
            defaultValue=""
            className="p-2 rounded-md block shadow"
            {...register("productId")}
          >
            <option value="" disabled>
              Escolha o produto
            </option>
            {products.map((p) => (
              <option value={p.id} key={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.productId && (
            <p className="text-red-500 text-sm">{errors.productId.message}</p>
          )}
          <select
            className="p-2 rounded-md block shadow"
            {...register("movementType")}
          >
            <option value="" disabled>
              Tipo da movimentação
            </option>
            <option value="income">Entrada</option>
            <option value="expense">Saída</option>
          </select>
          {errors.movementType && (
            <p className="text-red-500 text-sm">
              {errors.movementType.message}
            </p>
          )}
          <input
            type="number"
            placeholder="Quantidade"
            className="p-2 w-full rounded-md shadow"
            {...register("quantity")}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggle}
              type="button"
              className="bg-stone-500 hover:bg-stone-600 duration-300 text-white p-2 rounded-md cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-stone-500 hover:bg-stone-600 duration-300 text-white p-2 rounded-md cursor-pointer"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Criar movimentação"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
