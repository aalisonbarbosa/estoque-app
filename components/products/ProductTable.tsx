"use client";

import { useAuth } from "@/context/AuthContext";
import { deleteProduct } from "@/lib/actions/product";

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type ProductTableProps = {
  products: Product[];
  onDelete: () => void;
  onPopup: (message: string, type: "success" | "error") => void;
  toggleVisible: () => void;
  onUpdate: (product: Product) => void;
};

export const ProductTable = ({
  products,
  onPopup,
  onDelete,
  toggleVisible,
  onUpdate,
}: ProductTableProps) => {
  const { isAdmin } = useAuth();

  async function handleDelete(id: string) {
    try {
      await deleteProduct(id);

      onDelete();
      onPopup("Produto removido!", "success");
    } catch (err) {
      console.error(err);
      onPopup("Erro ao excluir produto!", "error");
    }
  }

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
            {isAdmin && (
              <td className="p-2">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    toggleVisible();
                    onUpdate(product)
                  }}
                >
                  Editar
                </button>
                |
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete(product.id)}
                >
                  Excluir
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
