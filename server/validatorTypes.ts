import { insertUserSchema } from "./db/schema/expenses";
import { z } from 'zod';



export const createPostSchema = insertUserSchema.omit({
    userId: true,
    createdAt: true,
    id: true
});

export type CreateExpense = z.infer<typeof createPostSchema>;
