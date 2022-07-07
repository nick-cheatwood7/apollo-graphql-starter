import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "types/Context";
import { ACCESS_TOKEN_SECRET } from "../../utils/constants";
import { AccessTokenPayload } from "types/TokenPayload";
import { ApolloError } from "apollo-server-express";

/**
 * Checks request headers for a valid access token and appends token payload to request context
 * @returns `next()`
 */
export const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  // check for provided header
  if (!authorization) {
    throw new Error("not authenticated");
  }

  // parse token
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload;
    context.payload = payload;
  } catch (err) {
    console.error(err);
    throw new ApolloError("not authenticated");
  }

  return next();
};
