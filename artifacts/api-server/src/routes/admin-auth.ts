import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, adminTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  const [admin] = await db.select().from(adminTable).where(eq(adminTable.username, username));
  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  req.session!.adminId = admin.id;
  res.json({ success: true, username: admin.username });
});

router.post("/auth/logout", (req, res) => {
  req.session!.destroy(() => {});
  res.json({ success: true });
});

router.get("/auth/me", (req, res) => {
  if (req.session?.adminId) {
    return res.json({ authenticated: true, adminId: req.session.adminId });
  }
  res.status(401).json({ authenticated: false });
});

export default router;
