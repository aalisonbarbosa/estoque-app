"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createStore } from "@/lib/actions/store";

import {
  storeRegistrationSchema,
  StoreRegistrationSchema,
} from "@/lib/schemas/store";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RegisterStorePage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    trigger,
  } = useForm<StoreRegistrationSchema>({
    resolver: zodResolver(storeRegistrationSchema),
  });

  async function onSubmit(formData: StoreRegistrationSchema) {
    try {
      setLoading(true);

      const storeData = {
        name: formData.storeName,
        address: formData.address,
        taxId: formData.taxId ?? "",
      };

      const adminData = {
        name: formData.adminName,
        email: formData.adminEmail,
        password: formData.password,
      };

      await createStore(storeData, adminData);

      setLoading(false);

      console.log("Loja registrada com sucesso!");

      router.push("/login");
    } catch (err) {
      setError("root", {
        message: "Erro inesperado no servidor. Tente novamente mais tarde.",
      });
      console.error(err);
    }
  }

  async function handleNextStep() {
    const isValid = await trigger(["storeName", "address", "taxId"]);
    if (isValid) {
      setStep(2);
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
                  placeholder="CNPJ (Opcional)"
                  className="w-full border rounded px-4 py-2"
                  {...register("taxId")}
                />
                {errors.taxId && (
                  <p className="text-red-500 text-sm">{errors.taxId.message}</p>
                )}
              </div>
              <Button
                label="Próximo"
                type="button"
                onClick={handleNextStep}
                customClass="w-full"
              />
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
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    className="w-full border rounded px-4 py-2"
                    {...register("password")}
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
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {errors.root && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative animate-fade-in">
                  {errors.root.message}
                </div>
              )}
              <Button
                label={
                  loading ? "carregando..." : "Cadastrar Loja e Administrador"
                }
                customClass="w-full"
                type="submit"
                disabled={loading}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
}
