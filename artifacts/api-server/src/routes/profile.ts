import { Router } from "express";
import { db, profileTable, insertProfileSchema } from "@workspace/db";
import { requireAdmin } from "../middlewares/require-admin";

const router = Router();

router.get("/profile", async (_req, res) => {
  const [profile] = await db.select().from(profileTable).limit(1);
  res.json(profile ?? null);
});

router.put("/profile", requireAdmin, async (req, res) => {
  const parsed = insertProfileSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const [existing] = await db.select().from(profileTable).limit(1);
  if (existing) {
    const [updated] = await db.update(profileTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .returning();
    return res.json(updated);
  }
  const [created] = await db.insert(profileTable).values(parsed.data as any).returning();
  res.status(201).json(created);
});

export default router;
