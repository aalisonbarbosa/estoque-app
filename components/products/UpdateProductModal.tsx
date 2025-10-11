"use client";

import { Product } from "@/types/types";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProduct } from "@/lib/actions/product";
import { useState } from "react";
import { UpdateProductSchema, updateProductSchema } from "@/lib/schemas/product";

interface UpdateProductModalProps {
  product: Product | null;
  onToggle: () => void;
  onCreated: () => void;
  onPopup: (message: string, type: "success"|"error") => void;
}

export const UpdateProductModal = ({
  product,
  onToggle,
  onCreated,
  onPopup
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
        quantity: formData.quantity,
        price: formData.price
      };

      await updateProduct(productUpdate);
      onToggle();
      onCreated();
      onPopup("Produto atualizado!", "success");
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
          className="p-2 w-full rounded-md shadow mt-2"
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
          className="p-2 w-full rounded-md shadow mt-2"
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
