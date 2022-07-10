import { z } from "zod";
import { validateEmail } from "./emailValidation";
import { validatePassword } from "./passwordValidation";

export const registrationValidation = z.object({
    email: validateEmail,
    password: validatePassword,
    firstName: z.string().min(2, "Name too short").max(200, "Name too long"),
    lastName: z.optional(z.string()),
});

export const loginValidation = z.object({
    email: validateEmail,
    password: validatePassword,
});

export const updateUserValidation = z.object({
    email: validateEmail,
    password: validatePassword,
    firstName: z.string().min(2, "Name too short").max(200, "Name too long"),
    lastName: z.optional(z.string()),
});
