interface Movement {
    productName: string;
    movementType: string;
    quantity: number
    userName: string;
    date: string
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
          {movements.map((mov, index) => (
            <tr key={index} className="border-t border-black/20">
              <td className="p-2">{mov.productName}</td>
              <td className="p-2">{mov.movementType}</td>
              <td className="p-2">{mov.quantity}</td>
              <td className="p-2">{mov.date}</td>
              <td className="p-2">{mov.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
