import "dotenv-safe/config";
import { PrismaClient } from "@prisma/client";
import { __prod__, __test__ } from "./constants";

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        log: ["query", "error"],
    });

if (!__prod__) {
    global.prisma = prisma;
}
