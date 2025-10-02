import z from "zod";

export const schemaNewUser = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type SchemaNewUser = z.infer<typeof schemaNewUser>;
