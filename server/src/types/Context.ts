import { Request, Response } from "express";
import RedisClient from "ioredis";
import { PrismaClient } from "@prisma/client";
import { Session } from "./Session";

export interface Context {
    req: Request & { session: Express.SessionStore & Session };
    res: Response;
    db: PrismaClient;
    redis: RedisClient;
}

export type RequestWithSession = {
    session: Express.SessionStore & Session
} & Request