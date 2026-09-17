import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, adminTable } from "@workspace/db";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

const defaultAdminUsername = process.env.ADMIN_USERNAME ?? "admin";
const configuredAdminPassword = process.env.ADMIN_PASSWORD;
const isProduction = process.env.NODE_ENV === "production";

if (isProduction && (!configuredAdminPassword || configuredAdminPassword.length < 12)) {
  throw new Error("ADMIN_PASSWORD must be at least 12 characters in production.");
}

const defaultAdminPassword = configuredAdminPassword ?? "admin123";

export async function ensureDefaultAdminUser() {
  const [existing] = await db
    .select()
    .from(adminTable)
    .where(eq(adminTable.username, defaultAdminUsername));

  if (!existing) {
    const desiredPasswordHash = await bcrypt.hash(defaultAdminPassword, 12);
    await db.insert(adminTable).values({
      username: defaultAdminUsername,
      passwordHash: desiredPasswordHash,
    });
  }
}