"use server";

import { prisma } from "../prisma";

export async function createSupplier(name: string) {
    const supplier = await prisma.supplier.create({
        data: { name },
    });

    return supplier;
}