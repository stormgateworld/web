import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const mailingListUsers = sqliteTable("mailing_list_users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
})
