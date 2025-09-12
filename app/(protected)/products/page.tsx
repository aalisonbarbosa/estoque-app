"use client";

import { CreateProductModal } from "@/components/CreateProductModal";
import { PaginationControls } from "@/components/PaginationControls";
import { ProductTable } from "@/components/ProductTable";
import { useState } from "react";

export default function Products() {
  const allProducts = [
    {
      id: 1,
      name: "arroz",
      qtd: 10,
      price: 7.9,
    },
    {
      id: 2,
      name: "biscoito",
      qtd: 30,
      price: 2,
    },
    {
      id: 3,
      name: "bolacha",
      qtd: 15,
      price: 6,
    },
    {
      id: 4,
      name: "feijão",
      qtd: 6,
      price: 10.9,
    },
    {
      id: 3,
      name: "bolacha",
      qtd: 15,
      price: 6,
    },
    {
      id: 4,
      name: "feijão",
      qtd: 6,
      price: 10.9,
    },
    {
      id: 3,
      name: "bolacha",
      qtd: 15,
      price: 6,
    },
    {
      id: 4,
      name: "feijão",
      qtd: 6,
      price: 10.9,
    },
    {
      id: 3,
      name: "bolacha",
      qtd: 15,
      price: 6,
    },
    {
      id: 4,
      name: "feijão",
      qtd: 6,
      price: 10.9,
    },
    {
      id: 3,
      name: "bolacha",
      qtd: 15,
      price: 6,
    },
    {
      id: 4,
      name: "feijão",
      qtd: 6,
      price: 10.9,
    },
    {
      id: 3,
      name: "bolacha",
      qtd: 15,
      price: 6,
    },
    {
      id: 4,
      name: "feijão",
      qtd: 6,
      price: 10.9,
    },
    {
      id: 3,
      name: "bolacha",
      qtd: 15,
      price: 6,
    },
    {
      id: 4,
      name: "feijão",
      qtd: 6,
      price: 10.9,
    },
  ];

  const [isVisible, setIsvisible] = useState<boolean>(false);
  const [inicio, setInicio] = useState(0);
  const [fim, setFim] = useState(4);

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

  const products = allProducts.slice(inicio, fim);

  return (
    <>
      {isVisible && <CreateProductModal onToggle={toggleVisible} />}

      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button
          onClick={toggleVisible}
          className="bg-stone-400 text-white p-2 rounded-md cursor-pointer"
        >
          Novo Projeto
        </button>
        <div className="bg-white rounded-xl p-2">
          <ProductTable products={products} />
          {allProducts.length > 5 && (
            <PaginationControls onPrev={handlerPrev} onNext={handlerNext} />
          )}
        </div>
      </section>
    </>
  );
}
