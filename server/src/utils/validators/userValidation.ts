import { z } from "zod";

export const registrationValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email"
    })
    .max(200, "Email is too long")
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required"
    })
    .min(3, "Password too short")
    .max(200, "Password too long"),
  firstName: z.string().min(2, "Name too short").max(200, "Name too long"),
  lastName: z.optional(z.string())
});

export const loginValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email"
    })
    .max(200, "Email is too long")
    .email({
      message: "Invalid email address"
    }),
  password: z
    .string({
      required_error: "Password is required"
    })
    .min(3, "Password too short")
    .max(200, "Password too long")
});

export const updateUserValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email"
    })
    .max(200, "Email is too long")
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required"
    })
    .min(3, "Password too short")
    .max(200, "Password too long"),
  firstName: z.string().min(2, "Name too short").max(200, "Name too long"),
  lastName: z.optional(z.string())
});
