import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.category.findMany();

        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Erro ao buscar categorias" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}