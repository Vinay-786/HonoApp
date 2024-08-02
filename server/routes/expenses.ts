import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(5).max(10),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const creatPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Utilities", amount: 100 },
  { id: 3, title: "Rent", amount: 1000 },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", creatPostSchema), (c) => {
    const expense = c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    console.log({ expense });
    return c.json(expense);
  })

  .get("/total-spent", async (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0,
    );
    return c.json({ total });
  })

  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.find((expense) => expense.id === id);
    if (!index) {
      return c.notFound();
    }

    const deleteExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deleteExpense });
  });
