import "dotenv-safe/config";
import { createServer } from "./createServer";
import { PORT } from "../constants";
import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
  datasources: { db: { url: process.env.TEST_DATABASE_URL } },
  log: ["error"]
});

export const TEST_PORT = Number(PORT) + 1;
export const TEST_URI = `http://localhost:${TEST_PORT}`;

export const createTestServer = async () => {
  const { app, server } = await createServer();

  // init Apollo Server
  await server.start();
  server.applyMiddleware({
    app,
    cors: false
  });

  // init Express app, listening on specific port
  app.listen(TEST_PORT, () => {
    console.log(`Test Express app listening on ${TEST_URI}`);
  });
};

export const startServer = async () => {};

export const seedDatabase = async () => {
  // empty all tables
  await db.user.deleteMany();
  await db.post.deleteMany();
};
