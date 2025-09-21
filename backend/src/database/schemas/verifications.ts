import { uuidv7 } from "uuidv7";import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const verifications = pgTable("verifications", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
