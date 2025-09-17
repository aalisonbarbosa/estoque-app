"use server";

import { prisma } from "../prisma";

type Product = {
    name: string;
    quantity: number;
    price: number;
    categoryId: string;
    supplierId: string;
    storeId: string;
}

export async function createProduct(product: Product) {
    try {
        const newProduct = await prisma.product.create({
            data: product,
        });

        return newProduct;
    } catch (err) {
        console.error("Erro ao criar produto:", err);
        throw err;
    }
}

export async function getProductsByStore(storeId: string) {
    try {
        const product = await prisma.product.findMany({
            where: {
                storeId,
            }
        })

        return product;
    } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        throw err;
    }
}