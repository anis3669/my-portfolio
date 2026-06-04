import { mysqlTable, text, int, json, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const experiencesTable = mysqlTable("experiences", {
  id: int("id").autoincrement().primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  period: text("period").notNull(),
  location: text("location").notNull().default(""),
  description: text("description").notNull(),
  technologies: json("technologies").notNull().$type<string[]>(),
  order: int("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const insertExperienceSchema = createInsertSchema(experiencesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiencesTable.$inferSelect;
