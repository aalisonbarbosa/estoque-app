"use server";

import { Category } from "@prisma/client";
import { prisma } from "../prisma";

export async function getCategories() {
    return await prisma.category.findMany();
}