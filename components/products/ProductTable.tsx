"use client";

import { useAuth } from "@/context/AuthContext";

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};


type ProductTableProps = {
  products: Product[];
};

export const ProductTable = ({ products }: ProductTableProps) => {
  const { isAdmin } = useAuth();

  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <td className="p-2 font-bold">Código</td>
          <td className="p-2 font-bold">Nome</td>
          <td className="p-2 font-bold">Quantidade</td>
          <td className="p-2 font-bold">Preço</td>
          {isAdmin && <td className="p-2 font-bold">Ações</td>}
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index} className="border-t border-black/20">
            <td className="p-2">{product.id}</td>
            <td className="p-2">{product.name}</td>
            <td className="p-2">{product.quantity}</td>
            <td className="p-2">{product.price}</td>
            {isAdmin && <td className="p-2">Editar | Excluir</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
