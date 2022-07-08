import { allow, deny, rule, shield } from "graphql-shield";
import { getUserId } from "../services/authService";
import { Context } from "../../types/Context";

const rules = {
  isAuthenticatedUser: rule({ cache: "contextual" })(
    (_parent, _args, context: Context) => {
      const userId = getUserId(context);
      return Boolean(userId);
    }
  ),
  isCurrentUser: rule()(async (_parent, args, context: Context) => {
    const userId = getUserId(context);
    const user = await context.db.user.findUnique({ where: { id: args.id } });
    if (!user) {
      return false;
    }
    return userId === user.id;
  }),
  isPostOwner: rule()(async (_parent, args, context: Context) => {
    const userId = getUserId(context);
    const author = await context.db.post
      .findUnique({
        where: {
          id: args.id
        }
      })
      .user();
    if (author) {
      return userId === author.id;
    } else {
      return false;
    }
  })
};

export const permissions = shield(
  {
    Query: {
      user: rules.isAuthenticatedUser,
      users: rules.isAuthenticatedUser,
      post: rules.isAuthenticatedUser,
      posts: rules.isAuthenticatedUser
    },
    Mutation: {
      login: allow,
      register: allow,
      updateUser: rules.isCurrentUser,
      deleteUser: rules.isCurrentUser,
      createPost: rules.isAuthenticatedUser,
      updatePost: rules.isPostOwner,
      deletePost: rules.isPostOwner
    }
  },
  { fallbackRule: deny }
);
