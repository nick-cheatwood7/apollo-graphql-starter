import { z } from "zod";

export const validatePostInput = z.object({
  title: z
    .string({
      required_error: "Title is required"
    })
    .max(200, "Title is too long"),
  message: z
    .string({ required_error: "Message is required" })
    .max(256, "Message is too long")
});
