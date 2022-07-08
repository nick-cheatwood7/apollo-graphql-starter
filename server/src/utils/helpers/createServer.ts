import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { Context } from "../../types/Context";
import { PORT } from "../constants";
import { prisma } from "../prisma";

import { schema } from "../../modules/graphql/schema";

const app = express();

// init middleware
app.use(
  cors({
    credentials: true,
    origin: [
      "https://studio.apollographql.com",
      `http://localhost:${PORT}/graphql`
    ]
  })
);
app.use(cookieParser());
app.use(express.json());

// init routes

function buildContext({ req, res }: Context) {
  return {
    req,
    res,
    db: prisma
  };
}

export async function createServer() {
  const server = new ApolloServer({
    schema: schema, // apply permissions
    csrfPrevention: true,
    cache: "bounded",
    context: buildContext
  });

  return { app, server };
}
