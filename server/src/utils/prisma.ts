import { PrismaClient } from "@prisma/client";
import { __prod__ } from "./constants";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"]
  });

if (!__prod__) {
  global.prisma = prisma;
}
