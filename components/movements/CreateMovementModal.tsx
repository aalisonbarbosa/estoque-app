"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { registerMovement } from "@/lib/actions/movement";
import { getProducts } from "@/lib/actions/product";

import { MovementSchema, movementSchema } from "@/lib/schemas/movement";

import { MovementDB, Product } from "@/types/types";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

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
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(movementSchema),
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
        setError("root", { type: "manual", message: "Produto não encontrado" });
        return;
      }

      const updatedQuantity =
        formData.movementType === "income"
          ? existingQuantity + formData.quantity
          : existingQuantity - formData.quantity;

      if (updatedQuantity < 0) {
        setError("root", {
          type: "manual",
          message: "Quantidade insuficiente em estoque",
        });
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
      console.error(err)
      setError("root", {
        type: "manual",
        message: "Erro inesperado no servidor",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal>
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
          defaultValue=""
          {...register("movementType")}
        >
          <option value="" disabled>
            Tipo da movimentação
          </option>
          <option value="income">Entrada</option>
          <option value="expense">Saída</option>
        </select>
        {errors.movementType && (
          <p className="text-red-500 text-sm">{errors.movementType.message}</p>
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
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
        <div className="flex items-center gap-4">
          <Button label="Cancelar" onClick={onToggle} type="button" />
          <Button
            label={loading ? "Carregando..." : "Criar movimentação"}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </Modal>
  );
};
