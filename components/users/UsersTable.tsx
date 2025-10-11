"use client";

import { deleteUser } from "@/lib/actions/user";
import { User } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

interface usersTableProps {
  users: User[];
  setRefresh: Dispatch<SetStateAction<number>>;
  onPopup: (message: string, type?: "success" | "error") => void;
}

export const UsersTable = ({ users, setRefresh, onPopup }: usersTableProps) => {
  async function handleDelete(email: string) {
    try {
      await deleteUser(email);

      setRefresh((prev) => prev + 1);

      onPopup("Usuário deletado!");
    } catch (err) {
      console.error(err);
      onPopup("Erro ao deletar usuário!", "error");
    }
  }

  return (
    <table className="w-full text-left bg-white rounded-xl">
      <thead className="font-bold">
        <tr>
          <th className="p-2">Nome</th>
          <th className="p-2">Email</th>
          <th className="p-2">Nível</th>
          {users.length > 1 && <th className="p-2">Ações</th>}
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id} className="border-t border-black/20">
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.role}</td>
            {user.role !== "ADMIN" && (
              <td className="p-2">
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete(user.email)}
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
