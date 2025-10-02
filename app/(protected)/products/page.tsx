"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getProducts } from "@/lib/actions/product";

import { CreateProductModal } from "@/components/products/CreateProductModal";
import { ProductTable } from "@/components/products/ProductTable";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { Loading } from "@/components/ui/Loading";

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export default function Products() {
  const { data: session } = useSession();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsvisible] = useState<boolean>(false);

  const [inicio, setInicio] = useState(0);
  const [fim, setFim] = useState(5);

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      if (!session?.user.storeId) return;

      setLoading(true);

      const products = (await getProducts(session.user.storeId)) ?? [];

      const formatted: Product[] = products.map((p) => ({
        id: p.id,
        name: p.name,
        quantity: p.quantity,
        price: p.price,
      }));

      setAllProducts(formatted);
      setLoading(false);
    }

    fetchProducts();
  }, [!session?.user.storeId, refresh]);

  const productsSlice = allProducts.slice(inicio, fim);

  function toggleVisible() {
    setIsvisible((prev) => !prev);
  }

  function handlerPrev() {
    if (inicio > 0) {
      setInicio(inicio - 5);
      setFim(fim - 5);
    }
  }

  function handlerNext() {
    if (fim < allProducts.length) {
      setInicio(inicio + 5);
      setFim(fim + 5);
    }
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
        <CreateProductModal
          onToggle={toggleVisible}
          onCreated={() => setRefresh((prev) => prev + 1)}
        />
      )}

      <div className="space-y-4 h-full">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button
          onClick={toggleVisible}
          className="bg-stone-500 hover:bg-stone-600 duration-300 text-white p-2 rounded-md cursor-pointer"
        >
          Novo Produto
        </button>

        {allProducts.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          <div className="bg-white rounded-xl p-2">
            <ProductTable products={productsSlice} />
            {allProducts.length > 5 && (
              <PaginationControls onPrev={handlerPrev} onNext={handlerNext} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
