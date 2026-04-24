import { pgTable, integer, text } from "drizzle-orm/pg-core";

export const siteContentTable = pgTable("site_content", {
  id: integer("id").primaryKey(),
  heroHeadline: text("hero_headline").notNull(),
  heroSubheading: text("hero_subheading").notNull(),
  heroCtaPrimary: text("hero_cta_primary").notNull(),
  heroCtaSecondary: text("hero_cta_secondary").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  contactEmail: text("contact_email").notNull(),
});

export type SiteContentRow = typeof siteContentTable.$inferSelect;
export type InsertSiteContentRow = typeof siteContentTable.$inferInsert;
