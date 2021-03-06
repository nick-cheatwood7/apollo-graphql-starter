import { extendType, idArg, intArg, nonNull, nullable, stringArg } from "nexus";
import { z } from "zod";
import { NexusGenObjects } from "../../../generated/nexus-types";
import { getUserId } from "../../../utils/services/authService";
import { validatePostInput } from "../../../utils/validators/postValidation";
import { Post, UpdatePostInput, UpdatePostResult } from "../types/Post";

export const CreatePostMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createPost", {
            type: UpdatePostResult,
            args: { options: nonNull(UpdatePostInput) },
            resolve: async (
                _root,
                { options },
                { req, db }
            ): Promise<NexusGenObjects["UpdatePostResult"]> => {
                try {
                    // validate input
                    validatePostInput.parse(options);
                } catch (error) {
                    const message =
                        (error as z.ZodError).issues[0].message ||
                        "Invalid input";
                    return {
                        message,
                        error: true,
                    };
                }

                const userId = getUserId(req) as string;
                try {
                    // create the record
                    await db.post.create({
                        data: {
                            userId,
                            ...options,
                        },
                    });
                    return {
                        message: "Post created successfully!",
                        error: false,
                    };
                } catch (error) {
                    return {
                        message: "Unable to create Post",
                        error: true,
                    };
                }
            },
        });
    },
});

export const PostQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("post", {
            type: nullable(Post),
            args: { id: nonNull(idArg({ description: "id of the post" })) },
            resolve: async (
                _root,
                { id },
                { db }
            ): Promise<NexusGenObjects["Post"] | null> => {
                const post = await db.post.findFirst({ where: { id } });
                return post;
            },
        });
    },
});

export const AllPostsQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("posts", {
            type: Post,
            args: {
                limit: nonNull(
                    intArg({ description: "how many posts to list at a time" })
                ),
                cursor: stringArg(),
            },
            resolve: async (
                _root,
                { limit, cursor },
                { db }
            ): Promise<NexusGenObjects["Post"][] | null> => {
                const realLimit = Math.min(50, limit);
                const dateCursor = new Date(parseInt(cursor as string));
                if (cursor) {
                    return await db.post.findMany({
                        where: { createdAt: { lt: dateCursor } },
                        take: realLimit,
                        orderBy: {
                            createdAt: "desc",
                        },
                    });
                } else {
                    return await db.post.findMany({
                        take: realLimit,
                        orderBy: {
                            createdAt: "desc",
                        },
                    });
                }
            },
        });
    },
});

export const UpdatePostMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updatePost", {
            type: UpdatePostResult,
            args: {
                id: nonNull(idArg({ description: "id of the post to update" })),
                options: nonNull(UpdatePostInput),
            },
            resolve: async (
                _root,
                { id, options },
                { db }
            ): Promise<NexusGenObjects["UpdatePostResult"]> => {
                try {
                    // validate input
                    validatePostInput.parse(options);
                } catch (error) {
                    const message =
                        (error as z.ZodError).issues[0].message ||
                        "Invalid input";
                    return {
                        message,
                        error: true,
                    };
                }

                try {
                    // update post
                    await db.post.update({
                        where: { id },
                        data: { ...options },
                    });
                    return {
                        message: "Post updated successfully!",
                        error: false,
                    };
                } catch (error) {
                    return {
                        message: "Unable to update post",
                        error: true,
                    };
                }
            },
        });
    },
});

export const DeletePostMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("deletePost", {
            type: UpdatePostResult,
            args: {
                id: nonNull(
                    idArg({ description: "the id of the post to delete" })
                ),
            },
            resolve: async (
                _root,
                { id },
                { db }
            ): Promise<NexusGenObjects["UpdatePostResult"]> => {
                try {
                    // delete the post
                    await db.post.delete({ where: { id } });
                    return {
                        message: "Post deleted successfully!",
                        error: false,
                    };
                } catch (error) {
                    return {
                        message: "Unable to delete Post",
                        error: true,
                    };
                }
            },
        });
    },
});
