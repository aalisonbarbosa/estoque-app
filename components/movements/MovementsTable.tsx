import { MovementTable } from "@/types/types";

export const MovementsTable = ({
  movements,
}: {
  movements: MovementTable[];
}) => {
  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="p-2">Produto</th>
          <th className="p-2">Tipo</th>
          <th className="p-2">Qtd</th>
          <th className="p-2 max-md:hidden">Data</th>
          <th className="p-2">Usuário</th>
        </tr>
      </thead>
      <tbody>
        {movements.map((m, index) => (
          <tr key={index} className="border-t border-black/20">
            <td className="p-2 capitalize">{m.productName}</td>
            <td
              className={`p-2 ${
                m.movementType === "expense" ? "text-red-500" : "text-green-500"}`}
            >
              {m.movementType === "income" ? "Entrada" : "Saída"}
            </td>
            <td className="p-2">{m.quantity}</td>
            <td className="p-2 max-md:hidden">{m.date}</td>
            <td className="p-2 capitalize">{m.userName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
