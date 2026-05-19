import { mysqlTable, serial, text, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const profileTable = mysqlTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  location: text("location").notNull().default(""),
  bio: text("bio").notNull().default(""),
  githubUrl: text("github_url").notNull().default(""),
  linkedinUrl: text("linkedin_url").notNull().default(""),
  cvUrl: text("cv_url").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const insertProfileSchema = createInsertSchema(profileTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profileTable.$inferSelect;
