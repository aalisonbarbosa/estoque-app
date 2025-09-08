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
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handlerSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p>{error}</p>}
          <button>Login</button>
        </form>
        <div>
          <button>Esqueceu a senha?</button>
          <button>
            <Link href="/register-store">Cadastrar loja</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
