import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

/**
 * Fix #1: Contact form now actually sends an email via SMTP.
 *
 * Required .env variables:
 *   MAIL_HOST   — SMTP host      (e.g. smtp.gmail.com)
 *   MAIL_PORT   — SMTP port      (e.g. 587)
 *   MAIL_SECURE — 'true' for 465, 'false' for 587 TLS
 *   MAIL_USER   — SMTP username  (your Gmail address)
 *   MAIL_PASS   — SMTP password  (Gmail App Password — NOT your login password)
 *   MAIL_TO     — destination inbox (defaults to MAIL_USER if unset)
 *
 * Gmail App Password setup:
 *   1. Enable 2FA on your Google account
 *   2. Go to https://myaccount.google.com/apppasswords
 *   3. Create an app password → paste it as MAIL_PASS
 */

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT ?? 587),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  // Always log so you can see the message even without SMTP configured
  console.log(`[Contact] ${name} <${email}> — ${subject}: ${message}`);

  // If SMTP credentials are not configured, respond with success but skip email
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.warn(
      "[Contact] MAIL_USER / MAIL_PASS not set — message logged but NOT emailed. " +
      "Add these to your .env file to enable email delivery."
    );
    res.json({ success: true, message: "Message received. I will get back to you soon." });
    return;
  }

  try {
    const transport = createTransport();
    const to = process.env.MAIL_TO ?? process.env.MAIL_USER!;

    await transport.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      replyTo: `"${name}" <${email}>`,
      to,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
          <h2 style="color:#7c3aed">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;color:#6b7280;font-weight:bold">From</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;color:#6b7280;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;color:#6b7280;font-weight:bold">Subject</td><td style="padding:8px">${subject}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;white-space:pre-wrap">${message}</div>
        </div>
      `,
    });

    console.log(`[Contact] Email sent to ${to}`);
    res.json({ success: true, message: "Message received. I will get back to you soon." });
  } catch (err: any) {
    console.error("[Contact] Failed to send email:", err.message);
    // Still respond 200 — user's message is logged even if mail fails
    res.json({ success: true, message: "Message received. I will get back to you soon." });
  }
});

export default router;
