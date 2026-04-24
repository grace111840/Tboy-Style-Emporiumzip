import { pgTable, text, integer, doublePrecision, jsonb, boolean } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: doublePrecision("price").notNull(),
  oldPrice: doublePrecision("old_price"),
  category: text("category").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  styleTip: text("style_tip"),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  popularity: integer("popularity").notNull().default(0),
  stockCount: integer("stock_count").notNull().default(20),
  isNew: boolean("is_new").notNull().default(false),
});

export type ProductRow = typeof productsTable.$inferSelect;
export type InsertProductRow = typeof productsTable.$inferInsert;
