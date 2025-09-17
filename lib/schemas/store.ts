import z from "zod";

export const storeRegistrationSchema = z.object({
  storeName: z.string().min(1, "O nome da loja é obrigatório"),
  address: z.string().min(1, "O endereço é obrigatório"),
  taxId: z
    .string()
    .min(11, "O CNPJ/CPF deve ter no mínimo 11 dígitos")
    .max(18, "O CNPJ/CPF deve ter no máximo 18 caracteres")
    .optional()
    .or(z.literal("")),
  adminName: z.string().min(1, "O nome do administrador é obrigatório"),
  adminEmail: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type StoreRegistrationSchema = z.infer<typeof storeRegistrationSchema>;