"use server";

import { Movement, Product } from "@/types/types";
import { prisma } from "../prisma";

export async function getMovements(storeId: string) {
    try {
        return prisma.movement.findMany({
            where: { product: { storeId } },
            include: {
                product: { select: { name: true } },
                user: { select: { name: true } },
            },
            orderBy: { date: "desc" },
        });
    } catch (err) {
        console.error(err)
        throw err;
    }
}

export async function registerMovement(movement: Movement, updatedQuantity: number): Promise<[Movement, Product]> {
    try {
        const [createdMovement, updatedProduct] = await prisma.$transaction([
            prisma.movement.create({
                data: {
                    productId: movement.productId,
                    movementType: movement.movementType,
                    quantity: movement.quantity,
                    userId: movement.userId,
                    storeId: movement.storeId,
                },
            }),
            prisma.product.update({
                where: { id: movement.productId },
                data: { quantity: updatedQuantity },
            }),
        ]);

        return [createdMovement, updatedProduct];
    } catch (err) {
        console.error(err)
        throw err;
    }
}