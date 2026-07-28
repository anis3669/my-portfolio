import { Router } from "express";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  console.log(`[Contact] ${name} <${email}> - ${subject}: ${message}`);

  res.json({ success: true, message: "Message received. I will get back to you soon." });
});

export default router;
