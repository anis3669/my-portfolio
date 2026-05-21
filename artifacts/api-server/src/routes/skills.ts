import { Router } from "express";
import { db, skillsTable, insertSkillSchema } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/require-admin";

const router = Router();

router.get("/skills", async (_req, res): Promise<void> => {
  const skills = await db.select().from(skillsTable).orderBy(asc(skillsTable.order), asc(skillsTable.id));
  res.json(skills);
});

router.post("/skills", requireAdmin, async (req, res): Promise<void> => {
  const parsed = insertSkillSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [{ id: insertId }] = await db.insert(skillsTable).values(parsed.data).$returningId();
  const [created] = await db.select().from(skillsTable).where(eq(skillsTable.id, insertId));
  res.status(201).json(created);
});

router.put("/skills/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const parsed = insertSkillSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [existing] = await db.select().from(skillsTable).where(eq(skillsTable.id, id));
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  await db.update(skillsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(skillsTable.id, id));
  const [updated] = await db.select().from(skillsTable).where(eq(skillsTable.id, id));
  res.json(updated);
});

router.delete("/skills/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const [existing] = await db.select().from(skillsTable).where(eq(skillsTable.id, id));
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  await db.delete(skillsTable).where(eq(skillsTable.id, id));
  res.json({ success: true });
});

export default router;
