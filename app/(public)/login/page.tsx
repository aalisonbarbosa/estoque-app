"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        setError("Email ou senha inválidos");
        return;
      }

      router.push("/");
    } catch (err: any) {
      setError("Erro inesperado no servidor. Tente novamente mais tarde.");
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
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-4 py-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="Senha"
            className="w-full border rounded px-4 py-2"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={loading}
            className="w-full bg-stone-500 text-white px-4 py-2 rounded hover:bg-stone-600 duration-300 cursor-pointer"
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
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
