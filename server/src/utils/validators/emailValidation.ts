import { z } from "zod";

export const validateEmail = z
    .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email",
    })
    .max(200, "Email is too long")
    .email({ message: "Invalid email address" });
