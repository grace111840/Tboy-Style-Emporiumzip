import { pgTable, integer, text } from "drizzle-orm/pg-core";

export const siteContentTable = pgTable("site_content", {
  id: integer("id").primaryKey(),
  heroHeadline: text("hero_headline").notNull(),
  heroSubheading: text("hero_subheading").notNull(),
  heroCtaPrimary: text("hero_cta_primary").notNull(),
  heroCtaSecondary: text("hero_cta_secondary").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  contactEmail: text("contact_email").notNull(),
  promoBanner: text("promo_banner").notNull().default("GET 10% OFF YOUR FIRST ORDER — USE CODE TBOYS10 AT CHECKOUT"),
  tagline: text("tagline").notNull().default("Wear the moment. Own the room."),
});

export type SiteContentRow = typeof siteContentTable.$inferSelect;
export type InsertSiteContentRow = typeof siteContentTable.$inferInsert;
