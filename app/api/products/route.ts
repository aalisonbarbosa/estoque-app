import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().min(0, "Price must be 0 or more"),
    quantity: z.number().int("Quantity must be an integer").min(0, "Quantity must be 0 or more"),
    categoryId: z.string().min(1, "Category is required"),
    supplierId: z.string().min(1, "Supplier is required"),
    storeId: z.string().min(1, "Store is required"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const validatedData = productSchema.parse(body)

        const newProduct = await prisma.product.create({
            data: {
                name: validatedData.name,
                price: validatedData.price,
                quantity: validatedData.quantity,
                categoryId: validatedData.categoryId,
                supplierId: validatedData.supplierId,
                store: { connect: { id: validatedData.storeId } }
            }
        })

        return NextResponse.json(
            {
                message: "Product created successfully",
                product: newProduct
            },
            { status: 201 }
        )
    } catch (err) {
        console.error(err);

        if (err instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid data", issues: err.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        )
    }

}