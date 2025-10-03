"use client";

import { Popup } from "@/components/ui/Popup";
import { useAuth } from "@/context/AuthContext";
import { createUser, deleteUser, getUsersByStore } from "@/lib/actions/user";
import { SchemaNewUser, schemaNewUser } from "@/lib/schemas/user";
import { User, UserBD } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// refatora essa codigo em componentes de form e tabela

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
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaNewUser) });

  async function onSubmit(formData: SchemaNewUser) {
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
      notifyPopup("Usuário criado!", "success");
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

  function notifyPopup(message: string, type: "success" | "error") {
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

      notifyPopup("Usuário deletado!", "success");
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
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            {...register("password")}
            className="p-2 w-full rounded-md shadow"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
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
