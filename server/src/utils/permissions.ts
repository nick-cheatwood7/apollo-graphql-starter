import { allow, rule, shield } from "graphql-shield";
import { verify } from "jsonwebtoken";
import { Context } from "../types/Context";
import { AccessTokenPayload } from "../types/TokenPayload";
import { ACCESS_TOKEN_SECRET } from "./constants";

const isAuthenticated = rule({ cache: "contextual" })(
  async (_parent, _args, ctx: Context, _info): Promise<Error | boolean> => {
    const authorization = ctx.req.headers["authorization"];
    // check for provided header
    if (!authorization) {
      return new Error("not authenticated");
    }
    // parse token
    try {
      const token = authorization.split(" ")[1];
      const payload = verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload;
      ctx.payload = payload;
      return true;
    } catch (error) {
      return false;
    }
  }
);

export const permissions = shield(
  {
    Query: {
      user: isAuthenticated,
      users: isAuthenticated
    },
    Mutation: {
      createPost: isAuthenticated,
      deletePost: isAuthenticated
    }
  },
  { fallbackRule: allow }
);
