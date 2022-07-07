import { extendType, inputObjectType, nonNull, objectType } from "nexus";
import { register } from "../resolvers/User";

export const Register = extendType({
  type: "Mutation",
  definition(t) {
    t.field("register", {
      type: RegisterResponse,
      args: { options: nonNull(RegisterInput) },
      resolve: register
    });
  }
});

export const RegisterResponse = objectType({
  name: "RegisterResponse",
  definition(t) {
    t.nonNull.string("message");
    t.nonNull.boolean("error");
  }
});

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("firstName");
    t.string("lastName");
  }
});
