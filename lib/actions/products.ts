"use server";

import { prisma } from "../prisma";

export async function getProductsByStore(storeId: string) {
    try {
        const product = await prisma.product.findMany({
            where: {
                storeId,
            }
        })

        return product;
    } catch (err){
        console.error("Erro ao buscar produtos:", err);
    }
}