import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const supplierSchema = z.object({
    name: z.string().min(1, "Name is required")
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name } = supplierSchema.parse(body);

        const existingSupplier = await prisma.supplier.findFirst({
            where: { name }
        });

        if (!existingSupplier) {
            const newSupplier = await prisma.supplier.create({
                data: { name }
            });

            return NextResponse.json(
                { message: "Supplier created successfully", supplier: newSupplier },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                { message: "Supplier already exists", supplier: existingSupplier },
                { status: 200 }
            );
        }
    } catch (err: any) {
        console.error(err);
        if (err instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid data", issues: err.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create supplier" },
            { status: 500 }
        );
    }
}