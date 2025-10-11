"use client";

import { createUser } from "@/lib/actions/user";
import { SchemaNewUser, schemaNewUser } from "@/lib/schemas/user";
import { UserBD } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface UserFormProps {
  setRefresh: Dispatch<SetStateAction<number>>;
  onPopup: (message: string, type?: "success" | "error") => void;
}

export const UserForm = ({ setRefresh, onPopup }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaNewUser) });

  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

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
      onPopup("Usuário criado!");
      reset();
    } catch (err) {
      console.error(err);
      setError("root", { message: "Erro ao criar usuário." });
    } finally {
      setLoading(false);
    }
  }

  return (
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
      <Input
        type="password"
        {...register("password")}
        customClass="p-2 w-full rounded-md shadow"
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}

      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <Button
        label={loading ? "Carregando..." : "Criar usuário"}
        type="submit"
        disabled={loading}
      />
    </form>
  );
};
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
