"use client";

import { Popup } from "@/components/ui/Popup";
import { useAuth } from "@/context/AuthContext";
import { createUser, deleteUser, getUsersByStore } from "@/lib/actions/user";
import { User, UserBD } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";


const schemaNewUser = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type schemaNewUser = z.infer<typeof schemaNewUser>;

export default function Settings() {
  const { isAdmin } = useAuth();

  if (!isAdmin) redirect("/");

  const { data: session } = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"sucess" | "error">("sucess");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaNewUser) });

  async function onSubmit(formData: schemaNewUser) {
    try {
      setLoading(true);
      const hashPassword = await bcrypt.hash(formData.password, 10);

      const formattedUser: UserBD = {
        name: formData.name,
        email: formData.email,
        password: hashPassword,
        storeId: session?.user.storeId!,
      };

      await createUser(formattedUser);

      setRefresh((prev) => prev + 1);
      notifyPopup("Usuário criado!", "sucess");
      reset();
    } catch (err) {
      console.error(err);
      setError("Erro ao criar usuário.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getUsers() {
      const res = await getUsersByStore(session?.user.storeId!);

      const formattedUser: User[] = res.map((user) => ({
        id: user.id,
        name: user.name!,
        email: user.email!,
        role: user.role,
      }));

      setUsers(formattedUser);
    }

    getUsers();
  }, [refresh]);

  function notifyPopup(message: string, type: "sucess" | "error") {
    setIsPopupVisible(true);

    setPopupMessage(message);
    setPopupType(type);

    setTimeout(() => {
      setIsPopupVisible(false);
    }, 5000);
  }

  async function handleDelete(email: string) {
    try {
      await deleteUser(email);

      setRefresh((prev) => prev + 1);

      notifyPopup("Usuário deletado!", "sucess");
    } catch (err) {
      console.error(err);
      notifyPopup("Erro ao deletar usuário!", "error");
    }
  }

  return (
    <div className="space-y-4 h-full">
      <h2 className="text-2xl font-bold">Usuários</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-56">
        <input
          type="text"
          placeholder="Nome"
          {...register("name")}
          className="p-2 w-full rounded-md shadow"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className="p-2 w-full rounded-md shadow"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Senha"
          {...register("password")}
          className="p-2 w-full rounded-md shadow"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-stone-500 hover:bg-stone-600 duration-300 text-white p-2 rounded-md cursor-pointer"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Criar usuário"}
        </button>
      </form>

      <table className="w-full text-left bg-white rounded-xl">
        <thead className="font-bold">
          <tr>
            <th className="p-2">Nome</th>
            <th className="p-2">Email</th>
            <th className="p-2">Nível</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="border-t border-black/20">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>

              <td className="p-2">
                Editar{" "}
                {user.role !== "ADMIN" && (
                  <button
                    className="cursor-pointer"
                    onClick={() => handleDelete(user.email)}
                  >
                    | Excluir
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Popup
        isPopupVisible={isPopupVisible}
        type={popupType}
        message={popupMessage}
      />
    </div>
  );
}
