"use server";

import { prisma } from "../prisma";

export async function createSupplier(name: string, storeId: string) {
    return await prisma.supplier.create({
        data: { name },
    });
}