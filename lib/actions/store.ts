"use server";

import bcrypt from "bcryptjs";
import { existingUser } from "./user";
import { prisma } from "../prisma";

interface Store {
    name: string;
    address: string;
    taxId: string;
}

interface Admin {
    name: string;
    email: string;
    password: string;
}

export async function getStoreName(storeId: string) {
    const store =  await prisma.store.findFirst({
        where: {
            id: storeId,
        },
    });

    return store?.name || "";
}

export async function createStore(store: Store, admin: Admin) {
    if (await existingUser(admin.email)) {
        return;
    }

    const hashPassword = await bcrypt.hash(admin.password, 10);

    await prisma.$transaction(async (tx) => {
        const createdStore = tx.store.create({
            data: {
                name: store.name,
                address: store.address,
                taxId: store.taxId
            }
        });

        await tx.user.create({
            data: {
                name: admin.name,
                email: admin.email,
                password: hashPassword,
                role: "ADMIN",
                storeId: (await createdStore).id
            }
        })
    }
    )
}