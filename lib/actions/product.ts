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
    await prisma.product.create({
        data: product,
    });
}

export async function getProducts(storeId: string) {
    return await prisma.product.findMany({
        where: {
            storeId,
        },
        orderBy: { name: "asc" },
    });
}

export async function getQtdProducts(storeId: string) {
    return await prisma.product.count({
        where: { storeId }
    });
}

export async function getOutOfStockProducts(storeId: string) {
    return await prisma.product.count({
        where: {
            storeId,
            quantity: 0
        }
    })
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: {
            id
        }
    })
}

type UpdateProductInput = {
    id: string;
    quantity: number;
    price?: number;
}

export async function updateProduct(product: UpdateProductInput) {
    await prisma.product.update({
        where: {
            id: product.id
        },
        data: {
            quantity: product.quantity,
            price: product.price
        }
    })
}