import { extendType, idArg, nonNull, nullable, stringArg } from "nexus";
import { z } from "zod";
import argon2 from "argon2";
import {
    registrationValidation,
    loginValidation,
    updateUserValidation,
} from "../../../utils/validators/userValidation";
import { NexusGenObjects } from "../../../generated/nexus-types";
import {
    EditUserInput,
    UpdateUserResult,
    User,
    LoginResponse,
    RegisterInput,
    RegisterResponse,
} from "../types/User";
import { getUserId } from "../../../utils/services/authService";
import {
    COOKIE_NAME,
    FORGET_PASSWORD_PREFIX,
    PORT,
} from "../../../utils/constants";
import { sendEmail } from "../../../utils/services/emailService";
import { validateEmail } from "../../../utils/validators/emailValidation";
import { DefaultResult } from "../types/Globals";
import { nanoid } from "nanoid";
import { validatePassword } from "../../../utils/validators/passwordValidation";

export const RegisterMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("register", {
            type: RegisterResponse,
            args: { options: nonNull(RegisterInput) },
            resolve: async (
                _root,
                { options },
                { db }
            ): Promise<NexusGenObjects["RegisterResponse"]> => {
                try {
                    // validate input
                    registrationValidation.parse(options);
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
                    // insert user into database
                    const hashedPassword = await argon2.hash(options.password);
                    await db.user.create({
                        data: {
                            ...options,
                            email: options.email.toLowerCase(),
                            password: hashedPassword,
                        },
                    });
                    return {
                        message:
                            "Thank you for registering! Please check your email to validate your account",
                        error: false,
                    };
                } catch (error) {
                    return {
                        message: "Account already exists",
                        error: true,
                    };
                }
            },
        });
    },
});

export const LoginMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("login", {
            type: LoginResponse,
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (
                _root,
                { email, password },
                { req, db }
            ): Promise<NexusGenObjects["LoginResponse"]> => {
                try {
                    // validate input
                    loginValidation.parse({ email, password });
                } catch (error) {
                    const message =
                        (error as z.ZodError).issues[0].message ||
                        "Invalid input";
                    return {
                        message,
                        error: true,
                    };
                }
                // find user and verify password
                const user = await db.user.findUnique({
                    where: { email: email.toLowerCase() },
                });
                if (!user) {
                    return {
                        message: "No account found",
                        error: true,
                    };
                }

                const isValid = await argon2.verify(user.password, password);
                if (!isValid) {
                    return {
                        message: "Invalid password",
                        error: true,
                    };
                }

                // update last login for this user
                await db.user.update({
                    where: { id: user.id },
                    data: { lastLogin: new Date() },
                });

                // Update the session
                req.session.userId = user.id;

                // send access token
                return {
                    message: "Logged in successfully!",
                    error: false,
                };
            },
        });
    },
});

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("user", {
            type: nullable(User),
            args: { id: nonNull(idArg({ description: "id of the user" })) },
            resolve: async (
                _root,
                { id },
                ctx
            ): Promise<NexusGenObjects["User"] | null> => {
                const user = await ctx.db.user.findUnique({ where: { id } });
                return user;
            },
        });
    },
});

export const AllUsersQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("users", {
            type: User,
            resolve: async (
                _root,
                _args,
                ctx
            ): Promise<NexusGenObjects["User"][] | null> => {
                const users = await ctx.db.user.findMany();
                return users;
            },
        });
    },
});

export const UpdateUserMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updateUser", {
            type: UpdateUserResult,
            args: {
                id: nonNull(idArg({ description: "id of the user to update" })),
                options: nonNull(EditUserInput),
            },
            resolve: async (
                _root,
                { id, options },
                { db }
            ): Promise<NexusGenObjects["UpdateUserResult"]> => {
                try {
                    // validate input
                    updateUserValidation.parse(options);
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
                    // update the user
                    await db.user.update({
                        where: { id },
                        data: { ...options },
                    });
                    return {
                        message: "User updated successfully!",
                        error: false,
                    };
                } catch (err) {
                    return {
                        message: "Unable to update user",
                        error: true,
                    };
                }
            },
        });
    },
});

export const DeleteUserMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("deleteUser", {
            type: UpdateUserResult,
            args: {
                id: nonNull(idArg({ description: "id of the user to delete" })),
            },
            resolve: async (
                _root,
                { id },
                { db }
            ): Promise<NexusGenObjects["UpdateUserResult"]> => {
                try {
                    await db.user.delete({ where: { id } });
                    return {
                        message: "User deleted successfully",
                        error: false,
                    };
                } catch {
                    return {
                        message: "Unable to delete User",
                        error: true,
                    };
                }
            },
        });
    },
});

export const MeQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("me", {
            type: nullable(User),
            resolve: async (
                _root,
                _args,
                { req, db }
            ): Promise<NexusGenObjects["User"] | null> => {
                const userId = getUserId(req);
                if (!userId) {
                    return null;
                }
                const user = await db.user.findUnique({
                    where: { id: userId },
                });
                return user;
            },
        });
    },
});

export const LogoutMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.boolean("logout", {
            resolve: async (_root, _args, { req, res }): Promise<boolean> => {
                return new Promise((resolve) => {
                    // remove session from Redis
                    req.session.destroy((err) => {
                        if (err) {
                            console.error(err);
                            resolve(false);
                            return;
                        }
                        // clear http cookie
                        res.clearCookie(COOKIE_NAME);
                        resolve(true);
                    });
                });
            },
        });
    },
});

export const ForgotPasswordMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("forgotPassword", {
            type: DefaultResult,
            args: { email: nonNull(stringArg()) },
            resolve: async (
                _root,
                { email },
                ctx
            ): Promise<NexusGenObjects["DefaultResult"]> => {
                try {
                    validateEmail.parse(email);
                } catch (error) {
                    const message = (error as z.ZodError).issues[0].message;
                    return {
                        message,
                        errors: true,
                    };
                }

                const user = await ctx.db.user.findUnique({
                    where: { email: email.toLowerCase() },
                });
                if (!user) {
                    return {
                        message: "No account found",
                        errors: true,
                    };
                }

                // store reset link in redis
                const token = nanoid();
                await ctx.redis.set(
                    FORGET_PASSWORD_PREFIX + token,
                    user.id,
                    "EX",
                    1000 * 60 * 60 * 24 * 2
                ); // 2 days

                // mock sending an email
                await sendEmail(
                    user.email,
                    `Your reset link is: http://localhost:${PORT}/reset_password/${token}`
                );

                return {
                    message:
                        "Password reset link sent. Please check your inbox.",
                    errors: false,
                };
            },
        });
    },
});

export const ChangePasswordMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("changePassword", {
            type: DefaultResult,
            args: {
                token: nonNull(stringArg()),
                newPassword: nonNull(stringArg()),
            },
            resolve: async (
                _root,
                { token, newPassword },
                { req, db, redis }
            ): Promise<NexusGenObjects["DefaultResult"]> => {
                try {
                    // validate new password
                    validatePassword.parse(newPassword);
                } catch (error) {
                    const message = (error as z.ZodError).issues[0].message;
                    return {
                        message,
                        errors: true,
                    };
                }

                // find the userId in redis
                const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);
                if (!userId) {
                    return {
                        message: "Token expired.",
                        errors: true,
                    };
                }

                try {
                    // update user's password
                    const hashedPassword = await argon2.hash(newPassword);
                    await db.user.update({
                        where: { id: userId },
                        data: {
                            password: hashedPassword,
                            lastLogin: new Date(),
                        },
                    });
                    // remove token from redis
                    await redis.del(FORGET_PASSWORD_PREFIX + token);
                } catch (error) {
                    return {
                        message: "Could not change password, please try again.",
                        errors: true,
                    };
                }

                // log in user after password change
                req.session.userId = userId;

                return {
                    message: "Password reset successfully!",
                    errors: false,
                };
            },
        });
    },
});
