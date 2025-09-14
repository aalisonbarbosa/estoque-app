"use client";

import { CreateProductModal } from "@/components/CreateProductModal";
import { PaginationControls } from "@/components/PaginationControls";
import { ProductTable } from "@/components/ProductTable";
import { getProductsByStore } from "@/lib/actions/products";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export default function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isVisible, setIsvisible] = useState<boolean>(false);
  const [inicio, setInicio] = useState(0);
  const [fim, setFim] = useState(4);

  const { data: session } = useSession();

  useEffect(() => {
    async function getProducts() {
      if (!session?.user.storeId) return;

      const products = (await getProductsByStore(session?.user.storeId)) ?? [];

      const formattedProducts: Product[] = products?.map((p) => ({
        id: p.id,
        name: p.name,
        quantity: p.quantity,
        price: p.price,
      }));

      setAllProducts(formattedProducts);
    }

    getProducts();
  }, []);

  const products = allProducts.slice(inicio, fim);

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

  return (
    <>
      {isVisible && <CreateProductModal onToggle={toggleVisible} />}

      <section className="space-y-4">
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
            <ProductTable products={products} />
            {allProducts.length > 5 && (
              <PaginationControls onPrev={handlerPrev} onNext={handlerNext} />
            )}
          </div>
        )}
      </section>
    </>
  );
}
