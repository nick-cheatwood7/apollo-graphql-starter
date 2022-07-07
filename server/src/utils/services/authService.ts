import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { Response } from "express";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants";
import {
  AccessTokenPayload,
  RefreshTokenPayload
} from "../../types/TokenPayload";

/**
 * Generates and signs a new access token, valid for 15 minutes
 * @param user a valid `User` object
 * @returns a signed access token
 */
export const createAccessToken = (user: User): string => {
  const token = sign(
    { userId: user.id } as AccessTokenPayload,
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m"
    }
  );
  return token;
};

/**
 * Generates and signs a new refresh token, valid for 7 days
 * @param user a valid `User` object
 * @returns a signed refresh token
 */
export const createRefreshToken = (user: User): string => {
  const token = sign(
    { userId: user.id, tokenVersion: user.tokenVersion } as RefreshTokenPayload,
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d"
    }
  );
  return token;
};

/**
 * Appends a refresh token to the response cookies
 * @param res a response object
 * @param token the refresh token to append to the response cookies
 */
export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("sid", token, {
    httpOnly: true,
    path: "/refresh_token",
    secure: true,
    sameSite: "none"
  });
};
