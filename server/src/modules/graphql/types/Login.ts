import { extendType, nonNull, objectType, stringArg } from "nexus";
import { login } from "../resolvers/User";

export const Login = extendType({
    type: "Mutation",
    definition(t) {
        t.field("login", {
            type: LoginResponse,
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            resolve: login
        });
    }
});

export const LoginResponse = objectType({
    name: "LoginResponse",
    definition(t) {
        t.nonNull.string("message");
        t.nonNull.boolean("error");
    }
});
