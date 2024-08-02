import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => {
  return c.json({ message: "test" });
});

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

app.use("/static/*", serveStatic({ root: "./fontend/dist" }));
app.get("*", serveStatic({ path: "./fontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
