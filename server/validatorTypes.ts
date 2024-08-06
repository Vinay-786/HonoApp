import { z } from "zod";

export const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string()
        .min(5, { message: "Title must be atleat 3 characters" })
        .max(30, { message: "Title can be at most 30 characters" }),
    amount: z.string(),
});

export const createPostSchema = expenseSchema.omit({ id: true });
