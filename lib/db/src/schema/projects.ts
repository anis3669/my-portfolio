import { mysqlTable, serial, text, boolean, int, json, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const projectsTable = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  description: text("description").notNull(),
  technologies: json("technologies").notNull().$type<string[]>().default([]),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  featured: boolean("featured").notNull().default(false),
  highlight: text("highlight"),
  adminFeatures: json("admin_features").$type<string[]>().default([]),
  order: int("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;
