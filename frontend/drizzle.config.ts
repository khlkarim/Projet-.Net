import { defineConfig } from "drizzle-kit";

require('dotenv').config();
console.log("THe connection string: ", process.env.DATABASE_URL);
export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  schemaFilter: ["public"],
});
