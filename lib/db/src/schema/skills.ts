import { mysqlTable, int, text, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const skillsTable = mysqlTable("skills", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  iconKey: text("icon_key").notNull().default(""),
  level: int("level").notNull().default(80),
  order: int("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const insertSkillSchema = createInsertSchema(skillsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skillsTable.$inferSelect;
