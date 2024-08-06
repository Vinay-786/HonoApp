import { numeric, serial, text, pgSchema, index, timestamp } from "drizzle-orm/pg-core";

export const expenseSchema = pgSchema("expenseSchema");

export const expenses = expenseSchema.table(
    'expenses',
    {
        id: serial('id').primaryKey(),
        userId: text("user_id").notNull(),
        title: text("title").notNull(),
        amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
        createdAt: timestamp("created_at").defaultNow(),
    }, (expenses) => {
        return {
            userIdINdex: index("name_idx").on(expenses.userId),
        }
    }
);
