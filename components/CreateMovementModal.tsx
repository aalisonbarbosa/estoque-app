"use client";

import { registerMovement } from "@/lib/actions/movements";
import { getProductsByStore } from "@/lib/actions/products";
import { Movement, Product } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type Props = {
  onToggle: () => void;
};

const movementSchema = z.object({
  productId: z.string().min(1, "O produto é obrigatório"),
  movementType: z.string().min(1, "O tipo é obrigatório"),
  quantity: z.coerce
    .number()
    .int()
    .min(1, "A quantidade deve ser um número inteiro"),
});

type MovementSchema = z.infer<typeof movementSchema>;

export const CreateMovementModal = ({onToggle}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchProducts() {
      if (!session?.user.storeId) return;

      const res = (await getProductsByStore(session.user.storeId)) ?? [];

      const formatted: Product[] = res.map((p) => ({
        id: p.id,
        name: p.name,
        quantity: p.quantity,
      }));

      setProducts(formatted);
    }

    fetchProducts();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(movementSchema),
  });

  async function onSubmit(formData: MovementSchema) {
    try {
      if (!session?.user.storeId || !session?.user.id)
        throw new Error("User ID ou store ID não encontrado");

      const existingQuantity = products.find(
        (product) => product.id === formData.productId
      )?.quantity;

      if (existingQuantity === undefined) {
        throw new Error("Produto não encontrado");
      }

      const updatedQuantity =
        formData.movementType === "income"
          ? existingQuantity + formData.quantity
          : existingQuantity - formData.quantity;

      if (updatedQuantity < 0) {
        throw new Error("Quantidade insuficiente em estoque");
      }

      const movementData: Movement = {
        ...formData,
        userId: session.user.id,
        storeId: session.user.storeId,
      };

      const [createdMovement, updatedProduct] = await registerMovement(
        movementData,
        updatedQuantity
      );

      console.log("Movement created: ", createdMovement);
      console.log("Product updated: ", updatedProduct);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute top-1/2 left-1/2 w-96 p-4 space-y-4 bg-white rounded-xl z-20 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-xl font-bold">Nova movimentação</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <select
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
            >
              Criar movimentação
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
