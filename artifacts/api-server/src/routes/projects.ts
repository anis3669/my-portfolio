import { Router } from "express";
import { db, projectsTable, insertProjectSchema } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/require-admin";

const router = Router();

router.get("/projects", async (_req, res): Promise<void> => {
  const projects = await db.select().from(projectsTable).orderBy(asc(projectsTable.order), asc(projectsTable.id));
  res.json(projects);
});

router.get("/projects/:id", async (req, res): Promise<void> => {
  const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, Number(req.params.id)));
  if (!project) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(project);
});

router.post("/projects", requireAdmin, async (req, res): Promise<void> => {
  const parsed = insertProjectSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [{ id: insertId }] = await db.insert(projectsTable).values(parsed.data).$returningId();
  const [created] = await db.select().from(projectsTable).where(eq(projectsTable.id, insertId));
  res.status(201).json(created);
});

router.put("/projects/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const parsed = insertProjectSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [existing] = await db.select().from(projectsTable).where(eq(projectsTable.id, id));
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  await db.update(projectsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(projectsTable.id, id));
  const [updated] = await db.select().from(projectsTable).where(eq(projectsTable.id, id));
  res.json(updated);
});

router.delete("/projects/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const [existing] = await db.select().from(projectsTable).where(eq(projectsTable.id, id));
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  await db.delete(projectsTable).where(eq(projectsTable.id, id));
  res.json({ success: true });
});

export default router;
