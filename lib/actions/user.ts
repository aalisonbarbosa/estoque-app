"use server";

import { prisma } from "../prisma";

type User = {
    name: string;
    email: string;
    password: string;
    storeId: string
}

export async function createUser(user: User) {
    return await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
            storeId: user.storeId
        }
    })
}

export async function existingUser(email: string) {
    return await prisma.user.findUnique({
        where: {
            email,
        }
    }) ? true : false;
}

export async function getUsersByStore(storeId: string) {
    return await prisma.user.findMany({
        where: {
            storeId,
        }
    })
}

export async function deleteUser(email: string) {
    return await prisma.user.delete({
        where: {
            email,
        }
    })
}