import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./server/db/schema/*",
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
});
