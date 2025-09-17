"use server";

import { prisma } from "../prisma";

export async function createSupplier(name: string) {
    try {
        const supplier = await prisma.supplier.create({
            data: { name },
        });
        
        return supplier;
    } catch (err) {
        console.error("Erro ao criar fornecedor:", err);
        throw err;
    }
}