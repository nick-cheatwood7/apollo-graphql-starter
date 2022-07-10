import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import session from "express-session";
import { redis } from "../redis";
import { corsConfig } from "../cors";
import connectRedis from "connect-redis";
import { Context } from "../../types/Context";
import { COOKIE_NAME, SESSION_SECRET, __prod__ } from "../constants";
import { prisma } from "../prisma";

import { schema } from "../../modules/graphql/schema";

const app = express();
const RedisStore = connectRedis(session);

// init middleware
app.set("trust proxy", !__prod__);
app.use(cors(corsConfig));
app.use(express.json());

// configure session store
app.use(
    session({
        name: COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // days
            // sameSite: __prod__ ? "none" : "lax",
            sameSite: "none",
            domain: __prod__ ? ".your-domain-here" : undefined,
        },
    })
);

function buildContext({ req, res }: Context): Context {
    return {
        req,
        res,
        db: prisma,
        redis: redis,
    } as Context;
}

export async function createServer() {
    const server = new ApolloServer({
        schema: schema, // apply permissions
        csrfPrevention: true,
        cache: "bounded",
        context: buildContext,
    });

    return { app, server };
}
