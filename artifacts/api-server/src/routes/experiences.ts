import { Router } from "express";
import { db, experiencesTable, insertExperienceSchema } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/require-admin";

const router = Router();

router.get("/experiences", async (_req, res) => {
  const experiences = await db.select().from(experiencesTable).orderBy(asc(experiencesTable.order), asc(experiencesTable.id));
  res.json(experiences);
});

router.post("/experiences", requireAdmin, async (req, res) => {
  const parsed = insertExperienceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [created] = await db.insert(experiencesTable).values(parsed.data).returning();
  res.status(201).json(created);
});

router.put("/experiences/:id", requireAdmin, async (req, res) => {
  const parsed = insertExperienceSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [updated] = await db.update(experiencesTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(experiencesTable.id, Number(req.params.id)))
    .returning();
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/experiences/:id", requireAdmin, async (req, res) => {
  const [deleted] = await db.delete(experiencesTable).where(eq(experiencesTable.id, Number(req.params.id))).returning();
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
