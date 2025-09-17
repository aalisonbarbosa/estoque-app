import { prisma } from "../prisma";

export async function existingUser(email: string) {
    return await prisma.user.findUnique({
        where: {
            email,
        }
    }) ? true : false;
}