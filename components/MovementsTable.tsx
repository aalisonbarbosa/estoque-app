interface Movement {
  productId: string;
  productName: string;
  movementType: string;
  quantity: number;
  userName: string; 
  date: string;
  storeId: string;
}

type MovementsTableProps = {
  movements: Movement[];
};

export const MovementsTable = ({ movements }: MovementsTableProps) => {
  return (
    <>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Produto</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Qtd</th>
            <th className="p-2">Data</th>
            <th className="p-2">Usuário</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((m) => (
            <tr key={m.productId} className="border-t border-black/20">
              <td className="p-2">{m.productName}</td>
              <td
                className={`p-2 ${
                  m.movementType === "expense"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {m.movementType === "income" ? "Entrada" : "Saída"}
              </td>
              <td className="p-2">{m.quantity}</td>
              <td className="p-2">{m.date}</td>
              <td className="p-2">{m.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
