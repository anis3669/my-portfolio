import app from "./app";
import { logger } from "./lib/logger";
import { db, adminTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function ensureAdminUser() {
  try {
    const [existing] = await db
      .select({ id: adminTable.id })
      .from(adminTable)
      .where(eq(adminTable.username, "admin"));
    if (!existing) {
      const passwordHash = await bcrypt.hash("admin123", 10);
      await db.insert(adminTable).values({ username: "admin", passwordHash });
      logger.info("Admin user created on startup");
    }
  } catch (err) {
    logger.warn({ err }, "Could not ensure admin user (DB may not be ready yet)");
  }
}

app.listen(port, async (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  await ensureAdminUser();
});
