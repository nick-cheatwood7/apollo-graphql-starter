import { beforeAll, describe, it, expect } from "@jest/globals";
import { Context, gql } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "../src/utils/helpers/createServer";

let server: ApolloServer<Context>;

beforeAll(async () => {
  // init graphql server
  server = (await createServer()).server;
});

describe("Healthcheck tests", () => {
  it("runs a healthcheck against graphql schemas", async () => {
    let result = await server.executeOperation({
      query: gql`
        query {
          test(bool: false)
        }
      `
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();
    expect(result.data?.test).toEqual(false);

    result = await server.executeOperation({
      query: gql`
        query {
          test(bool: invalidArgument)
        }
      `
    });
    expect(result).toBeTruthy();
    expect(result.errors).toBeTruthy();
  });
});
