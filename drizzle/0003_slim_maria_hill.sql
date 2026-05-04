CREATE TABLE `land_attachments` (
	`id` text PRIMARY KEY NOT NULL,
	`report_id` text NOT NULL,
	`owner` text NOT NULL,
	`object_key` text NOT NULL,
	`filename` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`sha256` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`report_id`) REFERENCES `land_reports`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_land_attachments_owner` ON `land_attachments` (`owner`,`report_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_land_attachments_content` ON `land_attachments` (`owner`,`report_id`,`sha256`);--> statement-breakpoint
CREATE TABLE `land_events` (
	`id` text PRIMARY KEY NOT NULL,
	`report_id` text NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`detail` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`report_id`) REFERENCES `land_reports`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_land_events_report` ON `land_events` (`report_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `land_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`status` text NOT NULL,
	`shared` integer DEFAULT 0 NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`payload_hash` text NOT NULL,
	`report` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_land_reports_owner` ON `land_reports` (`owner`,`updated_at`);--> statement-breakpoint
CREATE INDEX `idx_land_reports_shared` ON `land_reports` (`shared`,`updated_at`);