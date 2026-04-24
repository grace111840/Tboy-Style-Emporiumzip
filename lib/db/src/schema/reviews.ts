import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: text("product_id").notNull(),
  author: text("author").notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ReviewRow = typeof reviewsTable.$inferSelect;
export type InsertReviewRow = typeof reviewsTable.$inferInsert;
