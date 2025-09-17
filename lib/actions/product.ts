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
    return await prisma.product.create({
        data: product,
    });
}

export async function getProductsByStore(storeId: string) {
    return await prisma.product.findMany({
        where: {
            storeId,
        }
    })
}