import { allow, IRule, rule, shield } from "graphql-shield";
import { getUserId } from "../services/authService";
import { Context } from "../../types/Context";
import { NexusGenFieldTypes } from "../../generated/nexus-types";
import { RuleTrue } from "graphql-shield/dist/rules";

type Queries = keyof NexusGenFieldTypes["Query"];
type SupportedQueries = {
    [Q in Queries]?: IRule | RuleTrue;
};

type Mutations = keyof NexusGenFieldTypes["Mutation"];
type SupportedMutations = {
    [M in Mutations]?: IRule | RuleTrue;
};

const rules = {
    isAuthenticatedUser: rule({ cache: "contextual" })(
        async (_parent, _args, { req }: Context) => {
            const userId = getUserId(req);
            return Boolean(userId);
        }
    ),
    isCurrentUser: rule()(async (_parent, args, { req, db }: Context) => {
        const userId = getUserId(req);
        const user = await db.user.findUnique({
            where: { id: args.id }
        });
        if (!user) {
            return false;
        }
        return userId === user.id;
    }),
    isPostOwner: rule()(async (_parent, args, { req, db }: Context) => {
        const userId = getUserId(req);
        const author = await db.post
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
            test: allow,
            user: rules.isAuthenticatedUser,
            users: rules.isAuthenticatedUser,
            post: rules.isAuthenticatedUser,
            posts: rules.isAuthenticatedUser,
            me: rules.isAuthenticatedUser
        } as SupportedQueries,
        Mutation: {
            login: allow,
            register: allow,
            updateUser: rules.isCurrentUser,
            deleteUser: rules.isCurrentUser,
            createPost: rules.isAuthenticatedUser,
            updatePost: rules.isPostOwner,
            deletePost: rules.isPostOwner
        } as SupportedMutations
    },
    { fallbackRule: allow, debug: true }
);
