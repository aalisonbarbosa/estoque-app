"use client";

import React, { useState } from "react";

export default function RegisterStorePage() {
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [taxId, setTaxId] = useState("");

  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handlerSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName,
          address,
          taxId,
          adminName,
          adminEmail,
          password,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Cadastrar Loja</h1>
        <form onSubmit={handlerSubmit} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Informações da Loja</h2>
            <input
              type="text"
              placeholder="Nome da Loja"
              className="w-full border rounded px-4 py-2"
              onChange={(e) => setStoreName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Endereço"
              className="w-full border rounded px-4 py-2"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="CNPJ"
              className="w-full border rounded px-4 py-2"
              onChange={(e) => setTaxId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              Informações do Administrador
            </h2>
            <input
              type="text"
              placeholder="Nome"
              className="w-full border rounded px-4 py-2"
              onChange={(e) => setAdminName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-4 py-2"
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full border rounded px-4 py-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-stone-500 text-white px-4 py-2 rounded hover:bg-stone-600 cursor-pointer">
            Cadastrar Loja e Administrador
          </button>
        </form>
      </div>
    </div>
  );
}
