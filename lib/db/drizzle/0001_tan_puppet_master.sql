ALTER TABLE `admin_users` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `experiences` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `experiences` MODIFY COLUMN `technologies` json NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `technologies` json NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `admin_features` json NOT NULL;--> statement-breakpoint
ALTER TABLE `skills` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `profile` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;