import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { uuidv7 } from "uuidv7";
export const accounts = pgTable("accounts", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  accountId: uuid("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
