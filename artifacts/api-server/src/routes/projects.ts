import { Router } from "express";
import { db, projectsTable, insertProjectSchema } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/require-admin";

const router = Router();

router.get("/projects", async (_req, res) => {
  const projects = await db.select().from(projectsTable).orderBy(asc(projectsTable.order), asc(projectsTable.id));
  res.json(projects);
});

router.get("/projects/:id", async (req, res) => {
  const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, Number(req.params.id)));
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
});

router.post("/projects", requireAdmin, async (req, res) => {
  const parsed = insertProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [created] = await db.insert(projectsTable).values(parsed.data).returning();
  res.status(201).json(created);
});

router.put("/projects/:id", requireAdmin, async (req, res) => {
  const parsed = insertProjectSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [updated] = await db.update(projectsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(projectsTable.id, Number(req.params.id)))
    .returning();
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/projects/:id", requireAdmin, async (req, res) => {
  const [deleted] = await db.delete(projectsTable).where(eq(projectsTable.id, Number(req.params.id))).returning();
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

export default router;
