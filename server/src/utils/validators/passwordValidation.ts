import { z } from "zod";

export const validatePassword = z
    .string({
        required_error: "Password is required",
    })
    .min(3, "Password too short")
    .max(200, "Password too long");
