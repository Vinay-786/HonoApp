CREATE SCHEMA "expenseSchema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expenseSchema"."expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"amount" numeric(12, 2) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "expenseSchema"."expenses" USING btree ("user_id");