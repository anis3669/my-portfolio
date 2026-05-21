import { Router } from "express";
import { db, profileTable, insertProfileSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/require-admin";

const router = Router();

router.get("/profile", async (_req, res): Promise<void> => {
  const [profile] = await db.select().from(profileTable).limit(1);
  res.json(profile ?? null);
});

router.put("/profile", requireAdmin, async (req, res): Promise<void> => {
  const parsed = insertProfileSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const [existing] = await db.select().from(profileTable).limit(1);
  if (existing) {
    await db.update(profileTable).set({ ...parsed.data, updatedAt: new Date() });
    const [updated] = await db.select().from(profileTable).limit(1);
    res.json(updated);
    return;
  }
  const [{ id: insertId }] = await db.insert(profileTable).values(parsed.data as any).$returningId();
  const [created] = await db.select().from(profileTable).where(eq(profileTable.id, insertId));
  res.status(201).json(created);
});

export default router;
