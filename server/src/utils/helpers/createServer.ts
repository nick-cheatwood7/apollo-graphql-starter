import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { Context } from "../../types/Context";
import { PORT, REDIS_URI, SESSION_SECRET, __prod__ } from "../constants";
import { prisma } from "../prisma";

import { schema } from "../../modules/graphql/schema";

const app = express();
const redisClient = new Redis(REDIS_URI);
const RedisStore = connectRedis(session);

// init middleware
app.set("trust proxy", !__prod__);
app.use(
    cors({
        credentials: true,
        origin: [
            "https://studio.apollographql.com",
            `http://localhost:${PORT}/graphql`
        ]
    })
);
app.use(express.json());

// configure session store
app.use(
    session({
        name: "qid",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true
        }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // days
            // sameSite: __prod__ ? "none" : "lax",
            sameSite: "none"
        }
    })
);

function buildContext({ req, res }: Context) {
    return {
        req,
        res,
        db: prisma
    } as Context;
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
