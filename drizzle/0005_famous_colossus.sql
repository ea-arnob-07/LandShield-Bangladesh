CREATE TABLE `land_auth_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`hits` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_land_auth_limits_expiry` ON `land_auth_limits` (`expires_at`);--> statement-breakpoint
CREATE TABLE `land_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `land_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_land_sessions_expiry` ON `land_sessions` (`expires_at`);--> statement-breakpoint
CREATE INDEX `idx_land_sessions_user` ON `land_sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `land_users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`is_demo` integer DEFAULT 0 NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`district` text DEFAULT '' NOT NULL,
	`address` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_land_users_email` ON `land_users` (`email`);--> statement-breakpoint
ALTER TABLE `land_reports` ADD `category` text DEFAULT 'unclassified' NOT NULL;--> statement-breakpoint
ALTER TABLE `land_reports` ADD `risk` text DEFAULT 'UNKNOWN' NOT NULL;--> statement-breakpoint
ALTER TABLE `land_reports` ADD `classified_by` text;