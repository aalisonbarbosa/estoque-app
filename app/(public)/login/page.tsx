"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setError("root", { message: "Email ou senha inválidos" });
        return;
      }

      router.push("/");
    } catch (err: any) {
      setError("root", {
        message: "Erro inesperado no servidor. Tente novamente mais tarde.",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <Input type="email" placeholder="Email" {...register("email")} />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Input type="password" {...register("password")} />
          
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
          <Button
            customClass="w-full"
            label={loading ? "Carregando..." : "Entrar"}
            disabled={loading}
          />
        </form>
        <div className="text-center mt-4 space-x-5">
          <button className="text-blue-700 hover:underline cursor-pointer">
            Esqueceu a senha?
          </button>
          <button className="text-blue-700 hover:underline cursor-pointer">
            <Link href="/register-store">Cadastrar loja</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
