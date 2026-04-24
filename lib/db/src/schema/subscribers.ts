import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const subscribersTable = pgTable(
  "subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    emailIdx: uniqueIndex("subscribers_email_unique").on(t.email),
  }),
);

export type SubscriberRow = typeof subscribersTable.$inferSelect;
export type InsertSubscriberRow = typeof subscribersTable.$inferInsert;
