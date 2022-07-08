import "dotenv-safe/config";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { __prod__, __test__ } from "./constants";

declare global {
  var prisma: PrismaClient | undefined;
}

const getPrismaClient = (): PrismaClient => {
  if (__prod__ || !__test__)
    return new PrismaClient({
      datasources: { db: { url: process.env.DATABASE_URL } },
      log: ["query", "error"]
    });
  else __test__;
  return new PrismaClient({
    datasources: { db: { url: process.env.TEST_DATABASE_URL } },
    log: ["error"]
  });
};

export const prisma = global.prisma || getPrismaClient();

if (!__prod__) {
  global.prisma = prisma;
}

export const prismaOptions: Prisma.PrismaClientOptions = {
  datasources: { db: { url: process.env.TEST_DATABASE_URL } },
  log: ["error"]
};
