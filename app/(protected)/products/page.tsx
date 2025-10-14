"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getProducts } from "@/lib/actions/product";

import { CreateProductModal } from "@/components/products/CreateProductModal";
import { ProductTable } from "@/components/products/ProductTable";
import { TablePagination } from "@/components/ui/TablePagination";
import { Loading } from "@/components/ui/Loading";
import { Popup } from "@/components/ui/Popup";
import { Button } from "@/components/ui/Button";
import { UpdateProductModal } from "@/components/products/UpdateProductModal";
import { usePopup } from "@/hooks/popup";
import { useAuth } from "@/context/AuthContext";

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export default function Products() {
  const { data: session } = useSession();
  const { isAdmin } = useAuth();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [createModalIsVisible, setCreateModalIsvisible] =
    useState<boolean>(false);
  const [updateModalIsvisible, setUpdateModalIsvisible] =
    useState<boolean>(false);

  const [productSelected, setProductSelected] = useState<Product | null>(null);

  const [inicio, setInicio] = useState(0);
  const [fim, setFim] = useState(5);

  const [refresh, setRefresh] = useState(0);

  const { isPopupVisible, popupMessage, popupType, notifyPopup } = usePopup();

  const storeId = session?.user.storeId;

  useEffect(() => {
    async function fetchProducts() {
      if (!storeId) return;

      setLoading(true);

      const products = (await getProducts(storeId)) ?? [];

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
  }, [storeId, refresh]);

  const products = allProducts.slice(inicio, fim);

  function toggleVisible() {
    setCreateModalIsvisible((prev) => !prev);
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
      {createModalIsVisible && (
        <CreateProductModal
          onToggle={toggleVisible}
          onCreated={() => setRefresh((prev) => prev + 1)}
          onPopup={notifyPopup}
        />
      )}

      {updateModalIsvisible && (
        <UpdateProductModal
          onToggle={() => setUpdateModalIsvisible((prev) => !prev)}
          product={productSelected}
          onCreated={() => setRefresh((prev) => prev + 1)}
          onPopup={notifyPopup}
        />
      )}

      <div className="space-y-4 h-full">
        <h1 className="text-2xl font-bold">Produtos</h1>
        {isAdmin && <Button label="Novo produto" onClick={toggleVisible} />}

        {allProducts.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          <div className="bg-white rounded-xl p-2">
            <ProductTable
              products={products}
              onPopup={notifyPopup}
              onDelete={() => setRefresh((prev) => prev + 1)}
              toggleVisible={() => setUpdateModalIsvisible((prev) => !prev)}
              onUpdate={setProductSelected}
            />
            {allProducts.length > 5 && (
              <TablePagination onPrev={handlerPrev} onNext={handlerNext} />
            )}
          </div>
        )}
      </div>
      <Popup
        isPopupVisible={isPopupVisible}
        message={popupMessage}
        type={popupType}
      />
    </>
  );
}
