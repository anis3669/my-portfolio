import { Router } from "express";
import { db, skillsTable, insertSkillSchema } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/require-admin";

const router = Router();

router.get("/skills", async (_req, res) => {
  const skills = await db.select().from(skillsTable).orderBy(asc(skillsTable.order), asc(skillsTable.id));
  res.json(skills);
});

router.post("/skills", requireAdmin, async (req, res) => {
  const parsed = insertSkillSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [created] = await db.insert(skillsTable).values(parsed.data).returning();
  res.status(201).json(created);
});

router.put("/skills/:id", requireAdmin, async (req, res) => {
  const parsed = insertSkillSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [updated] = await db.update(skillsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(skillsTable.id, Number(req.params.id)))
    .returning();
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/skills/:id", requireAdmin, async (req, res) => {
  const [deleted] = await db.delete(skillsTable).where(eq(skillsTable.id, Number(req.params.id))).returning();
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
