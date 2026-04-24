import { pgTable, text, integer, doublePrecision, jsonb } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: doublePrecision("price").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  popularity: integer("popularity").notNull().default(0),
});

export type ProductRow = typeof productsTable.$inferSelect;
export type InsertProductRow = typeof productsTable.$inferInsert;
