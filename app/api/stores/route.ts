import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { storeName, address, taxId, adminName, adminEmail, password } =
            await req.json();

        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminEmail
            }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const store = await prisma.store.create({
            data: {
                name: storeName,
                address,
                taxId,
            }
        })

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN",
                storeId: store.id
            }
        })

        return NextResponse.json(
            { message: "Store and Admin created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}