import { Router, type IRouter } from "express";
import { db, reviewsTable } from "@workspace/db";
import { CreateReviewBody, ListReviewsQueryParams } from "@workspace/api-zod";
import { desc, eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/reviews", async (req, res) => {
  const { productId } = ListReviewsQueryParams.parse(req.query);
  const rows = productId
    ? await db
        .select()
        .from(reviewsTable)
        .where(eq(reviewsTable.productId, productId))
        .orderBy(desc(reviewsTable.createdAt))
    : await db.select().from(reviewsTable).orderBy(desc(reviewsTable.createdAt));
  res.json(
    rows.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    })),
  );
});

router.post("/reviews", async (req, res) => {
  const body = CreateReviewBody.parse(req.body);
  const [row] = await db.insert(reviewsTable).values(body).returning();
  res.status(201).json({ ...row, createdAt: row.createdAt.toISOString() });
});

export default router;
