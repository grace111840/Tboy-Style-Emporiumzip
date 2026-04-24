import { Router, type IRouter } from "express";
import { db, siteContentTable } from "@workspace/db";
import { UpdateSiteContentBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const DEFAULTS = {
  id: 1,
  heroHeadline: "The New Classic",
  heroSubheading:
    "Unmistakably modern. Confident and refined. Step into the atelier.",
  heroCtaPrimary: "SHOP NOW",
  heroCtaSecondary: "EXPLORE COLLECTION",
  whatsappNumber: "1234567890",
  contactEmail: "atelier@tboysclothing.com",
};

async function getOrInit() {
  const [row] = await db
    .select()
    .from(siteContentTable)
    .where(eq(siteContentTable.id, 1));
  if (row) return row;
  const [inserted] = await db
    .insert(siteContentTable)
    .values(DEFAULTS)
    .onConflictDoNothing()
    .returning();
  if (inserted) return inserted;
  const [refetched] = await db
    .select()
    .from(siteContentTable)
    .where(eq(siteContentTable.id, 1));
  return refetched;
}

router.get("/site-content", async (_req, res) => {
  const row = await getOrInit();
  const { id: _id, ...rest } = row;
  res.json(rest);
});

router.patch("/site-content", async (req, res) => {
  await getOrInit();
  const body = UpdateSiteContentBody.parse(req.body);
  const [row] = await db
    .update(siteContentTable)
    .set(body)
    .where(eq(siteContentTable.id, 1))
    .returning();
  const { id: _id, ...rest } = row;
  res.json(rest);
});

export default router;
