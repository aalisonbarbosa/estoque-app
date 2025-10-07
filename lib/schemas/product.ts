import z from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  quantity: z.coerce
    .number()
    .int("A quantidade deve ser um número inteiro")
    .min(1, "A quantidade deve ser pelo menos 1"),
  price: z.coerce.number().min(0.1, "O preço deve ser no mínimo 0,1"),
  categoryId: z.string().min(1, "A categoria é obrigatória"),
  supplierName: z
    .string()
    .min(1, "O nome do fornecedor é obrigatório")
    .max(100, "O nome do fornecedor deve ter no máximo 100 caracteres"),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const updateProductSchema = z.object({
  quantity: z.coerce
    .number()
    .int("A quantidade deve ser um número inteiro")
    .min(1, "A quantidade deve ser pelo menos 1"),
  price: z.coerce.number().min(0.1, "O preço deve ser no mínimo 0,1"),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;