import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { gql } from "apollo-server-core";
import { print } from "graphql";
import axios from "axios";
import { TestServer } from "../src/utils/TestServer";

const app = new TestServer();

beforeAll(async () => {
  // boostrap servers
  await app.init();
  await app.seedDatabase();
});

afterAll(async () => {
  // deinit
  await app.destroy();
});

describe("Authentication Tests", () => {
  test("Register User", async () => {
    const registerMutation = gql`
      mutation {
        register(
          options: {
            email: "test@test.com"
            password: "test"
            firstName: "Test"
            lastName: "User"
          }
        ) {
          message
          error
        }
      }
    `;

    const response = await axios.post(
      "http://localhost:4001/graphql",
      { query: print(registerMutation) },
      { withCredentials: true }
    );
    const result = response.data;
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();
    expect(result.data?.register).toBeTruthy();
  });

  test("Login user", async () => {
    const loginMutation = gql`
      mutation {
        login(email: "test@test.com", password: "test") {
          message
          error
          accessToken
        }
      }
    `;

    const response = await axios.post(
      "http://localhost:4001/graphql",
      { query: print(loginMutation) },
      { withCredentials: true }
    );

    const result = response.data;
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();
    expect(result.data?.login.accessToken).toBeTruthy();
  });
});
