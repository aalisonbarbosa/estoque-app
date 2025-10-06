"use client";

import { Product } from "@/types/types";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { updateProduct } from "@/lib/actions/product";
import { useState } from "react";

interface UpdateProductModalProps {
  product: Product | null;
  onToggle: () => void;
  onCreated: () => void;
}

const updateProductSchema = z.object({
  quantity: z.coerce
    .number()
    .int("A quantidade deve ser um número inteiro")
    .min(1, "A quantidade deve ser pelo menos 1"),
  price: z.coerce.number().min(0.1, "O preço deve ser no mínimo 0,1"),
});

type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export const UpdateProductModal = ({
  product,
  onToggle,
  onCreated,
}: UpdateProductModalProps) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProductSchema),
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: UpdateProductSchema) {
    try {
      setLoading(true);
      if (
        product?.price === formData.price &&
        product.quantity === formData.quantity
      ) {
        setError("root", {
          type: "manual",
          message: "Nenhuma alteração foi feita.",
        });
        setLoading(false);
        return;
      }

      const productUpdate: Product = {
        id: product?.id!,
        ...formData,
      };

      await updateProduct(productUpdate);
      onToggle();
      onCreated();
    } catch (err) {
      console.error(err);
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
      <h2 className="text-xl font-bold">{product?.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label htmlFor="quantity">Nova quantidade</label>
        <input
          type="number"
          id="quantity"
          className="p-2 w-full rounded-md shadow"
          defaultValue={product?.quantity}
          {...register("quantity")}
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity.message}</p>
        )}
        <label htmlFor="price">Novo preço</label>
        <input
          type="number"
          id="price"
          className="p-2 w-full rounded-md shadow"
          defaultValue={product?.price}
          step="any"
          {...register("price")}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
        <div className="flex items-center gap-4">
          <Button
            label="Cancelar"
            onClick={() => onToggle()}
            type="button"
            disabled={loading}
          />
          <Button
            label={loading ? "Carregando..." : "Salvar"}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </Modal>
  );
};
