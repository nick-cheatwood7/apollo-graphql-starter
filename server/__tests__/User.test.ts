import { createTestContext } from "./__helpers";

const ctx = createTestContext();

describe("User Tests", () => {
  test("Registers a new User", async () => {
    // Create a new User
    const result = await ctx.client.request(`
      mutation {
        register(options: { email: "test@test.com", password: "test", firstName: "Test", lastName: "Person" }) {
          message
          error
        }
      }
    `);

    // Snapshot record and
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();
    expect(result.data?.register).toBeTruthy();
  });

  test("Logs in a User", async () => {
    // Log in a User
    const result = await ctx.client.request(`
      mutation {
        login(email: "test@test.com", password: "test") {
          message
          error
          accessToken
        }
      }
    `);

    expect(result).toBeTruthy();
    expect(result).toHaveProperty("data");
    expect(result.errors).toBeFalsy();
    expect(result.data?.login.accessToken).toBeTruthy();
  });
});
