import { Router, type IRouter } from "express";
import { db, productsTable } from "@workspace/db";
import {
  CreateProductBody,
  UpdateProductBody,
  GetProductParams,
  UpdateProductParams,
  DeleteProductParams,
} from "@workspace/api-zod";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";

const router: IRouter = Router();

router.get("/products", async (_req, res) => {
  const rows = await db.select().from(productsTable);
  res.json(rows);
});

router.get("/products/:id", async (req, res) => {
  const { id } = GetProductParams.parse(req.params);
  const [row] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));
  if (!row) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(row);
});

router.post("/products", async (req, res) => {
  const body = CreateProductBody.parse(req.body);
  const id = `p_${randomUUID().slice(0, 8)}`;
  const [row] = await db
    .insert(productsTable)
    .values({ ...body, id })
    .returning();
  res.status(201).json(row);
});

router.patch("/products/:id", async (req, res) => {
  const { id } = UpdateProductParams.parse(req.params);
  const body = UpdateProductBody.parse(req.body);
  const [row] = await db
    .update(productsTable)
    .set(body)
    .where(eq(productsTable.id, id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(row);
});

router.delete("/products/:id", async (req, res) => {
  const { id } = DeleteProductParams.parse(req.params);
  const result = await db
    .delete(productsTable)
    .where(eq(productsTable.id, id))
    .returning();
  if (result.length === 0) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.status(204).send();
});

export default router;
