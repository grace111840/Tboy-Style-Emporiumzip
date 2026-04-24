import { Router, type IRouter } from "express";
import { db, subscribersTable } from "@workspace/db";
import { CreateSubscriberBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/subscribers", async (_req, res) => {
  const rows = await db
    .select()
    .from(subscribersTable)
    .orderBy(desc(subscribersTable.createdAt));
  res.json(
    rows.map((r) => ({
      id: r.id,
      email: r.email,
      createdAt: r.createdAt.toISOString(),
    })),
  );
});

router.post("/subscribers", async (req, res) => {
  const body = CreateSubscriberBody.parse(req.body);
  const email = body.email.trim().toLowerCase();
  const [row] = await db
    .insert(subscribersTable)
    .values({ email })
    .onConflictDoUpdate({
      target: subscribersTable.email,
      set: { email },
    })
    .returning();
  res.status(201).json({
    id: row.id,
    email: row.email,
    createdAt: row.createdAt.toISOString(),
  });
});

export default router;
