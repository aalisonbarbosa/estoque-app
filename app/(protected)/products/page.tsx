"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getProductsByStore } from "@/lib/actions/product";

import { CreateProductModal } from "@/components/CreateProductModal";
import { ProductTable } from "@/components/ProductTable";
import { PaginationControls } from "@/components/PaginationControls";

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

  useEffect(() => {
    async function fetchProducts() {
      if (!session?.user.storeId) return;

      setLoading(true);

      const products = (await getProductsByStore(session.user.storeId)) ?? [];

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
  }, []);

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

  function handleProductCreated(newProduct: Product) {
    setAllProducts((prev) => [newProduct, ...prev]);
  }

  return (
    <>
      {isVisible && (
        <CreateProductModal
          onToggle={toggleVisible}
        />
      )}

      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button
          onClick={toggleVisible}
          className="bg-stone-500 hover:bg-stone-600 duration-300 text-white p-2 rounded-md cursor-pointer"
        >
          Novo Produto
        </button>

        {loading ? (
          <p>Buscando produtos...</p>
        ) : allProducts.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          <div className="bg-white rounded-xl p-2">
            <ProductTable products={productsSlice} />
            {allProducts.length > 5 && (
              <PaginationControls onPrev={handlerPrev} onNext={handlerNext} />
            )}
          </div>
        )}
      </section>
    </>
  );
}
