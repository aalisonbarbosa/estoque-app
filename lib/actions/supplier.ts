"use server";

import { prisma } from "../prisma";

export async function createSupplier(name: string, storeId: string) {
    return await prisma.supplier.create({
        data: { name, storeId },
    });
}

export async function supplierExists(name: string, storeId: string) {
    return !!(await prisma.supplier.findFirst({
        where: { name, storeId },
        select: { id: true },
    }));
}

export async function getSupplierByName(name: string, storeId: string) {
    return await prisma.supplier.findFirst({
        where: {
            name,
            storeId
        }, select: {
            name: true, id: true
        }
    })
}

export async function getSuppliers(storeId: string) {
    return await prisma.supplier.findMany({
        where: {
            storeId
        }, select: {
            name: true, id: true
        }
    })
}