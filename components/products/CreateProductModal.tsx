"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { getCategories } from "@/lib/actions/category";
import { createProduct } from "@/lib/actions/product";
import {
  createSupplier,
  getSupplierByName,
  getSuppliers,
  supplierExists,
} from "@/lib/actions/supplier";

import { ProductSchema, productSchema } from "@/lib/schemas/product";

import { Category, Supplier } from "@/types/types";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

type Props = {
  onToggle: () => void;
  onCreated: () => void;
  onPopup: (message: string, type?: "success" | "error") => void;
};

export const CreateProductModal = ({ onToggle, onCreated, onPopup }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const storeId = session?.user.storeId;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(data: ProductSchema) {
    try {
      setLoading(true);
      if (!storeId) {
        throw new Error("Store ID não encontrado");
      }

      const exists = await supplierExists(data.supplierName, storeId);

      let supplier: Supplier;

      if (!exists) {
        supplier = await createSupplier(data.supplierName, storeId);
      } else {
        supplier = (await getSupplierByName(data.supplierName, storeId))!;
      }

      await createProduct({
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        categoryId: data.categoryId,
        supplierId: supplier.id,
        storeId: storeId,
      });

      onCreated();
      onToggle();
      onPopup("Produto criado!");
    } catch (err) {
      console.error(err);
      setError("root", {
        message: "Erro inesperado no servidor.",
      });
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

    async function fetchSuplliers() {
      setSuppliers(await getSuppliers(storeId!));
    }

    fetchCategories();
    fetchSuplliers();
  }, []);

  return (
    <Modal>
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
          list="suppliers"
          {...register("supplierName")}
        />
        <datalist id="suppliers">
          {suppliers.map((supplier) => (
            <option value={supplier.name} key={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </datalist>
        {errors.supplierName && (
          <p className="text-red-500 text-sm">{errors.supplierName.message}</p>
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
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
        <div className="flex items-center gap-4">
          <Button label="Cancelar" onClick={onToggle} type="button" />
          <Button
            label={loading ? "Carregando..." : "Criar produto"}
            disabled={loading}
            type="submit"
          />
        </div>
      </form>
    </Modal>
  );
};
