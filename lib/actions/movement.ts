"use server";

import { Movement } from "@/types/types";
import { prisma } from "../prisma";

export async function getMovements(storeId: string) {
    return prisma.movement.findMany({
        where: { product: { storeId } },
        include: {
            product: { select: { name: true } },
            user: { select: { name: true } },
        },
        orderBy: { date: "desc" },
    });
}

export async function registerMovement(movement: Movement, updatedQuantity: number) {
    await prisma.$transaction([
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
}