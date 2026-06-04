CREATE TABLE `admin_users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `experiences` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`period` text NOT NULL,
	`location` text NOT NULL DEFAULT (''),
	`description` text NOT NULL,
	`technologies` json NOT NULL DEFAULT ('[]'),
	`order` int NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `experiences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL DEFAULT (''),
	`description` text NOT NULL,
	`technologies` json NOT NULL DEFAULT ('[]'),
	`github_url` text,
	`live_url` text,
	`featured` boolean NOT NULL DEFAULT false,
	`highlight` text,
	`admin_features` json DEFAULT ('[]'),
	`order` int NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`icon_key` text NOT NULL DEFAULT (''),
	`level` int NOT NULL DEFAULT 80,
	`order` int NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `skills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL DEFAULT (''),
	`location` text NOT NULL DEFAULT (''),
	`bio` text NOT NULL DEFAULT (''),
	`github_url` text NOT NULL DEFAULT (''),
	`linkedin_url` text NOT NULL DEFAULT (''),
	`cv_url` text NOT NULL DEFAULT (''),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profile_id` PRIMARY KEY(`id`)
);
