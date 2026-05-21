import { Router } from "express";
import { db, experiencesTable, insertExperienceSchema } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/require-admin";

const router = Router();

router.get("/experiences", async (_req, res): Promise<void> => {
  const experiences = await db.select().from(experiencesTable).orderBy(asc(experiencesTable.order), asc(experiencesTable.id));
  res.json(experiences);
});

router.post("/experiences", requireAdmin, async (req, res): Promise<void> => {
  const parsed = insertExperienceSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [{ id: insertId }] = await db.insert(experiencesTable).values(parsed.data).$returningId();
  const [created] = await db.select().from(experiencesTable).where(eq(experiencesTable.id, insertId));
  res.status(201).json(created);
});

router.put("/experiences/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const parsed = insertExperienceSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [existing] = await db.select().from(experiencesTable).where(eq(experiencesTable.id, id));
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  await db.update(experiencesTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(experiencesTable.id, id));
  const [updated] = await db.select().from(experiencesTable).where(eq(experiencesTable.id, id));
  res.json(updated);
});

router.delete("/experiences/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const [existing] = await db.select().from(experiencesTable).where(eq(experiencesTable.id, id));
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  await db.delete(experiencesTable).where(eq(experiencesTable.id, id));
  res.json({ success: true });
});

export default router;
