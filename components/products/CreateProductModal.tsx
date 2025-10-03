"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { getCategories } from "@/lib/actions/category";
import { createProduct } from "@/lib/actions/product";
import { createSupplier } from "@/lib/actions/supplier";

import { ProductSchema, productSchema } from "@/lib/schemas/product";

import { Category, Supplier } from "@/types/types";

type Props = {
  onToggle: () => void;
  onCreated: () => void;
  onPopup: (message: string, type: "success" | "error") => void;
};

export const CreateProductModal = ({ onToggle, onCreated, onPopup }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(data: ProductSchema) {
    try {
      setLoading(true);
      const supplier: Supplier = await createSupplier(data.supplierName);

      if (!session?.user.storeId) {
        throw new Error("Store ID não encontrado");
      }

      await createProduct({
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        categoryId: data.categoryId,
        supplierId: supplier.id,
        storeId: session.user.storeId,
      });

      onCreated();
      onToggle();
      onPopup("Produto criado!", "success")
    } catch (err) {
      console.error(err);
      setError("Erro ao criar o produto. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategories();

        setCategories(categories);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute top-1/2 left-1/2 w-96 p-4 space-y-4 bg-white rounded-xl z-20 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-xl font-bold">Novo produto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            className="p-2 w-full rounded-md shadow"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
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
          <input
            type="number"
            placeholder="Preço"
            className="p-2 w-full rounded-md shadow"
            step="any"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
          <input
            type="text"
            placeholder="Fornecedor"
            className="p-2 w-full rounded-md shadow"
            {...register("supplierName")}
          />
          {errors.supplierName && (
            <p className="text-red-500 text-sm">
              {errors.supplierName.message}
            </p>
          )}
          <select
            id="category"
            defaultValue=""
            className="p-2 rounded-md block shadow"
            {...register("categoryId")}
          >
            <option value="" disabled>
              Categoria
            </option>
            {Array.isArray(categories) &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
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
              {loading ? "Carregando..." : "Criar produto"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
