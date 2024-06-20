import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email required!" })
    .email({ message: "Invalid email!" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password required!" })
    .min(8, { message: "Password must have at least 8 characters!" }),
});

export const todoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be 3 characters required!" }),
});
