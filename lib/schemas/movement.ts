import z from "zod";

export const movementSchema = z.object({
  productId: z.string().min(1, "O produto é obrigatório"),
  movementType: z.string().min(1, "O tipo é obrigatório"),
  quantity: z.coerce
    .number()
    .int()
    .min(1, "A quantidade deve ser um número inteiro"),
});

export type MovementSchema = z.infer<typeof movementSchema>;