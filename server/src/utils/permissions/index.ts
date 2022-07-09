import { allow, IRule, rule, shield } from "graphql-shield";
import { getUserId } from "../services/authService";
import { Context } from "../../types/Context";
import { NexusGenFieldTypes } from "../../generated/nexus-types";

type Queries = keyof NexusGenFieldTypes["Query"];
type SupportedQueries = {
    [Q in Queries]?: IRule;
};

type Mutations = keyof NexusGenFieldTypes["Mutation"];
type SupportedMutations = {
    [M in Mutations]?: IRule;
};

const rules = {
    isAuthenticatedUser: rule({ cache: "contextual" })(
        async (_parent, _args, context: Context) => {
            const userId = getUserId(context);
            return Boolean(userId);
        }
    ),
    isCurrentUser: rule()(async (_parent, args, context: Context) => {
        const userId = getUserId(context);
        const user = await context.db.user.findUnique({
            where: { id: args.id }
        });
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
        } as SupportedQueries,
        Mutation: {
            updateUser: rules.isCurrentUser,
            deleteUser: rules.isCurrentUser,
            createPost: rules.isAuthenticatedUser,
            updatePost: rules.isPostOwner,
            deletePost: rules.isPostOwner
        } as SupportedMutations
    },
    { fallbackRule: allow, debug: true }
);
