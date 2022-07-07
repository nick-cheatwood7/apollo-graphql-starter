import { objectType } from "nexus";
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
