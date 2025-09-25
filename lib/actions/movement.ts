"use server";

import { MovementDB } from "@/types/types";
import { prisma } from "../prisma";

export async function getMovements(storeId: string) {
    return prisma.movement.findMany({
        where: { storeId },
        include: {
            product: { select: { name: true } },
            user: { select: { name: true } },
        },
        orderBy: { date: "desc" },
    });
}

export async function registerMovement(movement: MovementDB, updatedQuantity: number) {
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

export async function getTodayMovements(storeId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return await prisma.movement.count({
        where: {
            storeId,
            date: {
                gte: startOfDay,
                lte: endOfDay
            }
        },
    })
}