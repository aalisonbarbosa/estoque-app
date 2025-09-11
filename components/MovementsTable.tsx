"use client";

import { useState } from "react";

type Moviment = {
  product: string;
  type: string;
  qtd: number;
  data: string;
  user: string;
}[];

const allMovements: Moviment = [
  {
    product: "Arroz",
    type: "Entrada",
    qtd: 10,
    data: "10/09",
    user: "alison",
  },
  {
    product: "Feijão",
    type: "Saida",
    qtd: 2,
    data: "15/09",
    user: "vitória",
  },
  {
    product: "Arroz",
    type: "Entrada",
    qtd: 10,
    data: "10/09",
    user: "renan",
  },
  {
    product: "Feijão",
    type: "Saida",
    qtd: 2,
    data: "15/09",
    user: "ewellyn",
  },
  {
    product: "Arroz",
    type: "Entrada",
    qtd: 10,
    data: "10/09",
    user: "amanda",
  },
  {
    product: "Feijão",
    type: "Saida",
    qtd: 2,
    data: "15/09",
    user: "xuxu",
  },
  {
    product: "Arroz",
    type: "Entrada",
    qtd: 10,
    data: "10/09",
    user: "sophio",
  },
];

export const MovementsTable = () => {
  const [inicio, setInicio] = useState(0);
  const [fim, setFim] = useState(4);

  const movement = allMovements.slice(inicio, fim);

  function handlerPrev() {
    if (inicio > 0) {
      setInicio(inicio - 5);
      setFim(fim - 5);
    }
  }

  function handlerNext() {
    if (fim < allMovements.length) {
      setInicio(inicio + 5);
      setFim(fim + 5);
    }
  }

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
          {movement.map((mov, index) => (
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
      {allMovements.length > 5 && (
        <div className="flex justify-center items-center gap-2">
          <button
            className="bg-stone-100 p-2 cursor-pointer rounded-md"
            onClick={handlerPrev}
          >
            Anterior
          </button>
          <button
            className="bg-stone-100 p-2 cursor-pointer rounded-md"
            onClick={handlerNext}
          >
            Próximo
          </button>
        </div>
      )}
    </>
  );
};
