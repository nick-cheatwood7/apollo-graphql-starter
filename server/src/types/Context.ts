import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AccessTokenPayload } from "./TokenPayload";

export interface Context {
  req: Request;
  res: Response;
  db: PrismaClient;
  payload?: AccessTokenPayload;
}
