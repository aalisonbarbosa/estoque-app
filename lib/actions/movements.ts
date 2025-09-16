"use server";

import { prisma } from "../prisma";

interface Movement {
    productId: string;
    movementType:string;
    quantity: number
    userId: string
}

export async function createMovement(movement: Movement) {
    try{
        const newMovement = await prisma.movement.create({
            data: movement
        })

        return newMovement
    } catch (err){
        console.error(err)
        throw err;
    }
}