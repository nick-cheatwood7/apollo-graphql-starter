import { PrismaClient } from "@prisma/client";
import { Context } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { Application } from "express";
import { Server } from "http";
import { PORT } from "./constants";
import { createServer } from "./helpers/createServer";
import { prisma } from "./prisma";

export class TestServer {
  private host!: Application;
  public apollo!: ApolloServer<Context>;
  private server!: Server;
  public port!: number;
  private db!: PrismaClient;
  public gqlEndpoint!: string;

  public init = async (): Promise<void> => {
    const { app, server } = await createServer();
    // Create Express app
    this.host = app;
    this.apollo = server;
    this.port = Number(PORT) + 1;
    this.gqlEndpoint = "http://localhost:" + this.port + "/graphql";
    // this.db = new PrismaClient(prismaOptions);
    this.db = prisma;

    // Connect GraphQL server
    await this.apollo.start();
    this.apollo.applyMiddleware({
      app: this.host,
      cors: false
    });

    // Listen
    this.server = this.host.listen(this.port);
  };

  public seedDatabase = async () => {
    // empty all tables
    await this.db.post.deleteMany();
    await this.db.user.deleteMany();
  };

  public destroy = async (): Promise<void> => {
    // close apollo server
    try {
      await this.apollo.stop();
    } catch (error) {
      console.error("Unable to shutdown Apollo Server");
    }

    try {
      // close http server
      this.server.close();
    } catch (err) {
      console.error("Unable to shutdown http server");
    }
  };
}
