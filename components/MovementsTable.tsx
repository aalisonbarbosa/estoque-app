type Movement = {
  product: string;
  type: string;
  qtd: number;
  data: string;
  user: string;
};

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
              <td className="p-2">{mov.product}</td>
              <td className="p-2">{mov.type}</td>
              <td className="p-2">{mov.qtd}</td>
              <td className="p-2">{mov.data}</td>
              <td className="p-2">{mov.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
