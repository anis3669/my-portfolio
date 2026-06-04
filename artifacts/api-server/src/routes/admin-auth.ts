import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, adminTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/auth/login", async (req, res): Promise<void> => {
  const rawUsername = typeof req.body?.username === "string" ? req.body.username : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const username = rawUsername.trim();

  if (!username || !password) {
    res.status(400).json({ error: "Username and password required" });
    return;
  }
  const [admin] = await db.select().from(adminTable).where(eq(adminTable.username, username));
  if (!admin) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  req.session!.adminId = admin.id;
  res.json({ success: true, username: admin.username });
});

router.post("/auth/logout", (req, res): void => {
  req.session!.destroy(() => {});
  res.json({ success: true });
});

router.get("/auth/me", (req, res): void => {
  if (req.session?.adminId) {
    res.json({ authenticated: true, adminId: req.session.adminId });
    return;
  }
  res.status(401).json({ authenticated: false });
});

export default router;
