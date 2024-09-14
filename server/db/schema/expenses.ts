import { z } from "zod";
import { numeric, serial, text, pgSchema, index, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const expenseSchema = pgSchema("expenseSchema");

export const expenses = expenseSchema.table(
    'expenses',
    {
        id: serial('id').primaryKey(),
        userId: text("user_id").notNull(),
        title: text("title").notNull(),
        amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
        date: date("date").notNull(),
        createdAt: timestamp("created_at").defaultNow(),
    }, (expenses) => {
        return {
            userIdINdex: index("name_idx").on(expenses.userId),
        }
    }
);


export const insertUserSchema = createInsertSchema(expenses, {
    title: z
        .string()
        .min(5, { message: "Title must be atleat 3 characters" }),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid Amt" })
});
export const selectUserSchema = createSelectSchema(expenses);
