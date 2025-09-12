type Product = {
  id: number;
  name: string;
  qtd: number;
  price: number;
};

type ProductTableProps = {
  products: Product[];
};

export const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <td className="p-2 font-bold">Código</td>
          <td className="p-2 font-bold">Nome</td>
          <td className="p-2 font-bold">Qtd</td>
          <td className="p-2 font-bold">Preço</td>
          <td className="p-2 font-bold">Ações</td>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index} className="border-t border-black/20">
            <td className="p-2">{product.id}</td>
            <td className="p-2">{product.name}</td>
            <td className="p-2">{product.qtd}</td>
            <td className="p-2">{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
