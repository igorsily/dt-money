import { defineConfig, type Config } from "drizzle-kit";
import { env } from "./src/config/env";

export default defineConfig({
  schema: "./src/database/schemas/*.ts",
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
}) satisfies Config;
