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
    <div>
      <div>
        <h1>Cadastrar Loja</h1>
        <form onSubmit={handlerSubmit}>
          <div>
            <h2>Informações da Loja</h2>
            <input
              type="text"
              placeholder="Nome da Loja"
              onChange={(e) => setStoreName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Endereço"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="CNPJ"
              onChange={(e) => setTaxId(e.target.value)}
            />
          </div>
          <div>
            <h2>Informações do Administrador</h2>
            <input
              type="text"
              placeholder="Nome"
              onChange={(e) => setAdminName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Cadastrar Loja e Administrador</button>
        </form>
      </div>
    </div>
  );
}
