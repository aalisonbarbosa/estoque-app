"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const storeRegistrationSchema = z.object({
  storeName: z.string().min(1, "O nome da loja é obrigatório"),
  address: z.string().min(1, "O endereço é obrigatório"),
  taxId: z
    .string()
    .min(11, "O CNPJ/CPF deve ter no mínimo 11 dígitos")
    .max(18, "O CNPJ/CPF deve ter no máximo 18 caracteres"),
  adminName: z.string().min(1, "O nome do administrador é obrigatório"),
  adminEmail: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

type StoreRegistrationSchema = z.infer<typeof storeRegistrationSchema>;

export default function RegisterStorePage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<StoreRegistrationSchema>({
    resolver: zodResolver(storeRegistrationSchema),
  });

  async function handleNextStep() {
    const isValid = await trigger(["storeName", "address", "taxId"]);
    if (isValid) {
      setStep(2);
    }
  }

  async function onSubmit(data: StoreRegistrationSchema) {
    setErrorMessage(null);
    try {
      setLoading(true);

      const res = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao registrar loja");
      }

      console.log("Loja registrada com sucesso!");

      router.push("/");
    } catch (err: any) {
      setErrorMessage(
        "Erro inesperado no servidor. Tente novamente mais tarde."
      );
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Cadastrar Loja</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Informações da Loja</h2>
                <input
                  type="text"
                  placeholder="Nome da Loja"
                  className="w-full border rounded px-4 py-2"
                  {...register("storeName")}
                />
                {errors.storeName && (
                  <p className="text-red-500 text-sm">
                    {errors.storeName.message}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Endereço"
                  className="w-full border rounded px-4 py-2"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="CNPJ"
                  className="w-full border rounded px-4 py-2"
                  {...register("taxId")}
                />
                {errors.taxId && (
                  <p className="text-red-500 text-sm">{errors.taxId.message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-stone-500 text-white px-4 py-2 rounded hover:bg-stone-600 cursor-pointer"
              >
                Próximo
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">
                  Informações do Administrador
                </h2>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full border rounded px-4 py-2"
                  {...register("adminName")}
                />
                {errors.adminName && (
                  <p className="text-red-500 text-sm">
                    {errors.adminName.message}
                  </p>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded px-4 py-2"
                  {...register("adminEmail")}
                />
                {errors.adminEmail && (
                  <p className="text-red-500 text-sm">
                    {errors.adminEmail.message}
                  </p>
                )}
                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full border rounded px-4 py-2"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative animate-fade-in">
                  {errorMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-stone-500 text-white px-4 py-2 rounded hover:bg-stone-600 cursor-pointer"
                disabled={loading}
              >
                {loading ? "carregando..." : "Cadastrar Loja e Administrador"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
