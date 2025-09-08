"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handlerSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.ok) {
      setError("Email ou senha inválidos");
    } else {
      redirect("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handlerSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-4 py-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full border rounded px-4 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button className="w-full bg-stone-500 text-white px-4 py-2 rounded hover:bg-stone-600 duration-300 cursor-pointer">
            Entrar
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
