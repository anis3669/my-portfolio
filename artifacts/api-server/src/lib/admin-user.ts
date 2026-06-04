import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, adminTable } from "@workspace/db";

export const DEFAULT_ADMIN_USERNAME = "admin";
export const DEFAULT_ADMIN_PASSWORD = "admin123";

export async function ensureDefaultAdminUser() {
  const desiredPasswordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
  const [existing] = await db
    .select()
    .from(adminTable)
    .where(eq(adminTable.username, DEFAULT_ADMIN_USERNAME));

  if (!existing) {
    await db.insert(adminTable).values({
      username: DEFAULT_ADMIN_USERNAME,
      passwordHash: desiredPasswordHash,
    });
    return;
  }

  const passwordMatches = await bcrypt.compare(DEFAULT_ADMIN_PASSWORD, existing.passwordHash);
  if (!passwordMatches) {
    await db
      .update(adminTable)
      .set({ passwordHash: desiredPasswordHash })
      .where(eq(adminTable.id, existing.id));
  }
}