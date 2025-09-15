"use client";

import { createProduct } from "@/lib/actions/products";
import { createSupplier } from "@/lib/actions/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type Props = {
  onToggle: () => void;
  onProductCreated: (product: Product) => void;
};

type Category = {
  id: string;
  name: string;
};

type Supplier = {
  id: string;
  name: string;
};

const productSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  quantity: z.coerce
    .number()
    .int("A quantidade deve ser um número inteiro")
    .min(1, "A quantidade deve ser pelo menos 1"),
  price: z.coerce.number().min(0.1, "O preço deve ser no mínimo 0,1"),
  categoryId: z.string().min(1, "A categoria é obrigatória"),
  supplierName: z
    .string()
    .min(1, "O nome do fornecedor é obrigatório")
    .max(100, "O nome do fornecedor deve ter no máximo 100 caracteres"),
});

type ProductSchema = z.infer<typeof productSchema>;

export const CreateProductModal = ({ onToggle, onProductCreated }: Props) => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(data: ProductSchema) {
    try {
      const supplier: Supplier = await createSupplier(data.supplierName);

      if (!session?.user.storeId) {
        throw new Error("Store ID não encontrado");
      }

      const product = await createProduct({
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        categoryId: data.categoryId,
        supplierId: supplier.id,
        storeId: session.user.storeId,
      });

      onProductCreated(product);

      console.log("Product created:", product);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("API retornou algo inesperado:", data);
          setCategories([]);
        }
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
        setCategories([]);
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
          <div className="flex items-center gap-4">
            <button
              onClick={onToggle}
              type="button"
              className="bg-stone-400 hover:bg-stone-500 duration-300 text-white p-2 rounded-md cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-stone-400 hover:bg-stone-500 duration-300 text-white p-2 rounded-md cursor-pointer"
            >
              Criar produto
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
