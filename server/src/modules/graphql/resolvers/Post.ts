import { FieldResolver } from "nexus";
import { z } from "zod";
import { NexusGenObjects } from "../../../generated/nexus-types";
import { getUserId } from "../../../utils/services/authService";
import { validatePostInput } from "../../../utils/validators/postValidation";

export const createPost: FieldResolver<"Mutation", "createPost"> = async (
    _src,
    { options },
    ctx
): Promise<NexusGenObjects["UpdatePostResult"]> => {
    try {
        // validate input
        validatePostInput.parse(options);
    } catch (error) {
        const message =
            (error as z.ZodError).issues[0].message || "Invalid input";
        return {
            message,
            error: true
        };
    }

    const userId = getUserId(ctx) as string;
    try {
        // create the record
        await ctx.db.post.create({
            data: {
                userId,
                ...options
            }
        });
        return {
            message: "Post created successfully!",
            error: false
        };
    } catch (error) {
        return {
            message: "Unable to create Post",
            error: true
        };
    }
};

export const getPostById: FieldResolver<"Query", "post"> = async (
    _src,
    { id },
    { db }
): Promise<NexusGenObjects["Post"] | null> => {
    const post = await db.post.findFirst({ where: { id } });
    return post;
};

export const getAllPosts: FieldResolver<"Query", "posts"> = async (
    _src,
    _args,
    { db }
): Promise<NexusGenObjects["Post"][] | null> => {
    const posts = await db.post.findMany();
    return posts;
};

export const updatePost: FieldResolver<"Mutation", "updatePost"> = async (
    _src,
    { id, options },
    { db }
): Promise<NexusGenObjects["UpdatePostResult"]> => {
    try {
        // validate input
        validatePostInput.parse(options);
    } catch (error) {
        const message =
            (error as z.ZodError).issues[0].message || "Invalid input";
        return {
            message,
            error: true
        };
    }

    try {
        // update post
        await db.post.update({
            where: { id },
            data: { ...options }
        });
        return {
            message: "Post updated successfully!",
            error: false
        };
    } catch (error) {
        return {
            message: "Unable to update post",
            error: true
        };
    }
};

export const deletePost: FieldResolver<"Mutation", "deletePost"> = async (
    _src,
    { id },
    { db }
): Promise<NexusGenObjects["UpdatePostResult"]> => {
    try {
        // delete the post
        await db.post.delete({ where: { id } });
        return { message: "Post deleted successfully!", error: false };
    } catch (error) {
        return {
            message: "Unable to delete Post",
            error: true
        };
    }
};
