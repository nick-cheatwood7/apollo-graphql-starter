import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  nullable,
  objectType,
  stringArg
} from "nexus";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById
} from "../resolvers/User";
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
    t.nonNull.int("tokenVersion");
    t.list.field("posts", {
      type: Post,
      resolve: async (root, _src, ctx) => {
        return await ctx.db.user.findUnique({ where: { id: root.id } }).posts();
      }
    });
  }
});

export const UserById = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: nullable(User),
      args: { id: nonNull(stringArg({ description: "id of the user" })) },
      resolve: getUserById
    });
  }
});

export const AllUsers = extendType({
  type: "Query",
  definition(t) {
    t.field("users", {
      type: nullable(list(User)),
      resolve: getAllUsers
    });
  }
});

export const EditUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateUser", {
      type: UpdateUserResult,
      args: {
        id: nonNull(stringArg({ description: "id of the User to edit" })),
        options: nonNull(EditUserInput)
      },
      resolve: updateUserById
    });
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

export const DeleteUserById = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteUser", {
      type: UpdateUserResult,
      args: { id: nonNull(stringArg()) },
      resolve: deleteUserById
    });
  }
});
