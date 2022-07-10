import { inputObjectType, objectType } from "nexus";
import { Node } from "./Node";
import { Post } from "./Post";

export const User = objectType({
    name: "User",
    definition(t) {
        t.implements(Node);
        t.nonNull.string("email");
        t.nonNull.string("firstName");
        t.string("lastName");
        t.date("lastLogin");
        t.list.field("posts", {
            type: Post,
            resolve: async (root, _src, ctx) => {
                return await ctx.db.user
                    .findUnique({ where: { id: root.id } })
                    .posts();
            }
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

export const EditUserInput = inputObjectType({
    name: "UpdateUserInput",
    definition(t) {
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nonNull.string("firstName");
        t.string("lastName");
    }
});

export const UpdateUserResult = objectType({
    name: "UpdateUserResult",
    definition(t) {
        t.nonNull.string("message");
        t.nonNull.boolean("error");
    }
});
