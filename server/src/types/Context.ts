import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AccessTokenPayload } from "./TokenPayload";
import { Session } from "./Session";

export interface Context {
    req: Request & { session: Express.SessionStore & Session };
    res: Response;
    db: PrismaClient;
    payload?: AccessTokenPayload;
}
