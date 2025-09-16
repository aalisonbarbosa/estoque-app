"use server";

import { prisma } from "../prisma";

interface Movement {
    productName: string;
    movementType: string;
    quantity: number;
    userName: string;
    storeId: string;
}

export async function getMovements(storeId: string) {
    try {
        const movements = await prisma.movement.findMany({
            where: {
                storeId,
            }
        })

        return movements;
    } catch (err) {
        console.error(err)
    }
}

export async function createMovement(movement: Movement) {
    try {
        const newMovement = await prisma.movement.create({
            data: movement
        })

        return newMovement
    } catch (err) {
        console.error(err)
        throw err;
    }
}