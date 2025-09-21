import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { uuidv7 } from "uuidv7";
export const sessions = pgTable("sessions", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
