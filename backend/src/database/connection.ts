import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/config/env";
import { schema } from "./schemas";

const connection = postgres(env.DATABASE_URL, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  database: env.DATABASE_NAME,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(connection, { schema, casing: "snake_case" });

export const closeConnection = async () => {
  await connection.end();
};
