import { FieldResolver } from "nexus";
import { z } from "zod";
import argon2 from "argon2";
import {
    registrationValidation,
    loginValidation,
    updateUserValidation
} from "../../../utils/validators/userValidation";
import { NexusGenObjects } from "../../../generated/nexus-types";

/**
 * Creates a new User account in the database
 * @returns an object indicating any errors that may have occurred
 */
export const register: FieldResolver<"Mutation", "register"> = async (
    _source,
    { options },
    { db }
): Promise<NexusGenObjects["RegisterResponse"]> => {
    try {
        // validate input
        registrationValidation.parse(options);
    } catch (error) {
        const message =
            (error as z.ZodError).issues[0].message || "Invalid input";
        return {
            message,
            error: true
        };
    }

    try {
        // insert user into database
        const hashedPassword = await argon2.hash(options.password);
        await db.user.create({
            data: {
                ...options,
                email: options.email.toLowerCase(),
                password: hashedPassword
            }
        });
        return {
            message:
                "Thank you for registering! Please check your email to validate your account",
            error: false
        };
    } catch (error) {
        return {
            message: "Account already exists",
            error: true
        };
    }
};

/**
 * Logs a User into the database
 * @returns an object indicating any erorrs that may have occurred
 */
export const login: FieldResolver<"Mutation", "login"> = async (
    _source,
    { email, password },
    { req, db }
): Promise<NexusGenObjects["LoginResponse"]> => {
    try {
        // validate input
        loginValidation.parse({ email, password });
    } catch (error) {
        const message =
            (error as z.ZodError).issues[0].message || "Invalid input";
        return {
            message,
            error: true
        };
    }

    // find user and verify password
    const user = await db.user.findUnique({
        where: { email: email.toLowerCase() }
    });
    if (!user) {
        return {
            message: "No account found",
            error: true
        };
    }
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
        return {
            message: "Invalid password",
            error: true
        };
    }

    // update last login for this user
    await db.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
    });

    // Update the session
    req.session.userId = user.id;

    // send access token
    return {
        message: "Logged in successfully!",
        error: false
    };
};

/**
 * Finds a User by Id
 * @returns a `User` or `null`
 */
export const getUserById: FieldResolver<"Query", "user"> = async (
    _src,
    { id },
    { db }
): Promise<NexusGenObjects["User"] | null> => {
    const user = await db.user.findUnique({ where: { id } });
    return user;
};

/**
 * Finds all Users in the database
 * @returns an array of Users, if any
 */
export const getAllUsers: FieldResolver<"Query", "users"> = async (
    _src,
    _args,
    { db }
): Promise<NexusGenObjects["User"][] | null> => {
    const users = await db.user.findMany();
    return users;
};

/**
 * Edits a user record by id
 * @returns a User, if updates were successful
 */
export const updateUserById: FieldResolver<"Mutation", "updateUser"> = async (
    _src,
    { id, options },
    { db }
): Promise<NexusGenObjects["UpdateUserResult"]> => {
    try {
        // validate input
        updateUserValidation.parse(options);
    } catch (error) {
        const message =
            (error as z.ZodError).issues[0].message || "Invalid input";
        return {
            message,
            error: true
        };
    }

    try {
        // update the user
        await db.user.update({
            where: { id },
            data: { ...options }
        });
        return {
            message: "User updated successfully!",
            error: false
        };
    } catch (err) {
        return {
            message: "Unable to update user",
            error: true
        };
    }
};

export const deleteUserById: FieldResolver<"Mutation", "deleteUser"> = async (
    _src,
    { id },
    { db }
): Promise<NexusGenObjects["UpdateUserResult"]> => {
    try {
        await db.user.delete({ where: { id } });
        return {
            message: "User deleted successfully",
            error: false
        };
    } catch {
        return {
            message: "Unable to delete User",
            error: true
        };
    }
};
