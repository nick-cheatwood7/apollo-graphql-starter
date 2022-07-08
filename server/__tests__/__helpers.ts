import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { execSync } from "child_process";
import getPort, { portNumbers } from "get-port";
import { GraphQLClient } from "graphql-request";
import { join } from "path";
import { Database } from "sqlite3";
import { prisma as db } from "../src/utils/prisma";
import { createServer } from "../src/utils/helpers/createServer";
import { Server } from "http";

type TestContext = {
  client: GraphQLClient;
  db: PrismaClient;
};

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;
  const graphqlCtx = graphqlTestContext();
  const prismaCtx = prismaTestContext();

  beforeEach(async () => {
    const client = await graphqlCtx.before();
    const db = await prismaCtx.before();

    Object.assign(ctx, {
      client,
      db
    });
  });

  afterEach(async () => {
    await graphqlCtx.after();
    await prismaCtx.after();
  });

  return ctx;
}

function graphqlTestContext() {
  const serverInstance = {} as {
    server: Server;
    apolloServer: ApolloServer;
  };

  return {
    async before() {
      const { app, server } = await createServer();
      const port = await getPort({ port: portNumbers(4000, 6000) });
      serverInstance.apolloServer = server;
      await serverInstance.apolloServer.start();
      serverInstance.server = app.listen({ port });
      // Close the Prisma Client connection when Apollo Server is closed
      serverInstance.server.on("close", async () => {
        db.$disconnect();
      });

      return new GraphQLClient(`http://localhost:${port}`, {
        credentials: "include"
      });
    },
    async after() {
      serverInstance?.server.close();
    }
  };
}

function prismaTestContext() {
  const prismaBinary = join(__dirname, "..", "node_modules", ".bin", "prisma");
  let prismaClient: null | PrismaClient = null;

  return {
    async before() {
      // Run migrations to ensure schema has the required structure
      execSync(`${prismaBinary} db push --preview-feature`);
      // Create a new Prisma Client connected to the generated schema
      prismaClient = new PrismaClient();
      return prismaClient;
    },
    async after() {
      // Drop the schema after the tests have been completed
      const client = new Database(":memory:");
      client.close();
      // Release Prisma Client connection
      await prismaClient?.$disconnect();
    }
  };
}
