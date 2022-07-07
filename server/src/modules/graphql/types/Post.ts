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
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost
} from "../resolvers/Post";
import { Node } from "./Node";
import { User } from "./User";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.implements(Node);
    t.nonNull.string("userId");
    t.nonNull.string("title");
    t.nonNull.string("message");
    t.field("user", {
      type: User,
      resolve: async (root, _args, ctx) => {
        return ctx.db.user.findUnique({ where: { id: root.userId } });
      }
    });
  }
});

export const UpdatePostInput = inputObjectType({
  name: "UpdatePostInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("message");
  }
});

export const UpdatePostResult = objectType({
  name: "UpdatePostResult",
  definition(t) {
    t.nonNull.string("message");
    t.nonNull.boolean("error");
  }
});

export const CreatePost = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: UpdatePostResult,
      args: { options: nonNull(UpdatePostInput) },
      resolve: createPost
    });
  }
});

export const UpdatePost = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePost", {
      type: UpdatePostResult,
      args: { id: nonNull(stringArg()), options: nonNull(UpdatePostInput) },
      resolve: updatePost
    });
  }
});

export const PostById = extendType({
  type: "Query",
  definition(t) {
    t.field("post", {
      type: nullable(Post),
      args: { id: nonNull(stringArg()) },
      resolve: getPostById
    });
  }
});

export const AllPostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("posts", {
      type: nullable(list(Post)),
      resolve: getAllPosts
    });
  }
});

export const DeletePost = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deletePost", {
      type: UpdatePostResult,
      args: { id: nonNull(stringArg()) },
      authorize: async (_root, args, { db, payload }): Promise<boolean> => {
        // are you the author?
        const userId = payload?.userId as string;
        const author = await db.post
          .findFirst({
            where: { id: args.id }
          })
          .user();

        if (!author) {
          return false;
        }

        return author.id === userId;
      },
      resolve: deletePost
    });
  }
});
