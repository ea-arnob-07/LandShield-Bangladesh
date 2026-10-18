-- Migration: 0000_dear_madripoor.sql
CREATE TABLE `cases` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`status` text NOT NULL,
	`ward` integer NOT NULL,
	`version` integer NOT NULL,
	`updated_at` text NOT NULL,
	`data` text NOT NULL
);

CREATE INDEX `idx_cases_owner_updated` ON `cases` (`owner`,`updated_at`);
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`case_id` text,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`detail` text NOT NULL,
	`created_at` text NOT NULL
);

CREATE INDEX `idx_events_owner_case` ON `events` (`owner`,`case_id`);
CREATE TABLE `evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`case_id` text NOT NULL,
	`task_id` text,
	`purpose` text NOT NULL,
	`object_key` text NOT NULL,
	`filename` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`created_at` text NOT NULL
);

CREATE INDEX `idx_evidence_owner_case` ON `evidence` (`owner`,`case_id`);
CREATE TABLE `workspaces` (
	`owner` text PRIMARY KEY NOT NULL,
	`settings` text NOT NULL,
	`created_at` text NOT NULL
);


-- Migration: 0001_old_daredevil.sql
ALTER TABLE `evidence` ADD `task_cycle` integer DEFAULT 0 NOT NULL;

-- Migration: 0002_typical_proudstar.sql
ALTER TABLE `cases` ADD `request_id` text;
CREATE UNIQUE INDEX `idx_cases_owner_request` ON `cases` (`owner`,`request_id`);

-- Migration: 0003_slim_maria_hill.sql
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

CREATE INDEX `idx_land_attachments_owner` ON `land_attachments` (`owner`,`report_id`);
CREATE UNIQUE INDEX `idx_land_attachments_content` ON `land_attachments` (`owner`,`report_id`,`sha256`);
CREATE TABLE `land_events` (
	`id` text PRIMARY KEY NOT NULL,
	`report_id` text NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`detail` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`report_id`) REFERENCES `land_reports`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE INDEX `idx_land_events_report` ON `land_events` (`report_id`,`created_at`);
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

CREATE INDEX `idx_land_reports_owner` ON `land_reports` (`owner`,`updated_at`);
CREATE INDEX `idx_land_reports_shared` ON `land_reports` (`shared`,`updated_at`);

-- Migration: 0004_busy_namor.sql
CREATE TABLE `land_map_cache` (
	`cache_key` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`expires_at` integer NOT NULL
);

CREATE INDEX `idx_land_map_cache_expiry` ON `land_map_cache` (`expires_at`);
CREATE TABLE `land_map_provider_state` (
	`provider` text PRIMARY KEY NOT NULL,
	`last_request_at` integer DEFAULT 0 NOT NULL
);


-- Migration: 0005_famous_colossus.sql
CREATE TABLE `land_auth_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`hits` integer NOT NULL,
	`expires_at` integer NOT NULL
);

CREATE INDEX `idx_land_auth_limits_expiry` ON `land_auth_limits` (`expires_at`);
CREATE TABLE `land_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `land_users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE INDEX `idx_land_sessions_expiry` ON `land_sessions` (`expires_at`);
CREATE INDEX `idx_land_sessions_user` ON `land_sessions` (`user_id`);
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

CREATE UNIQUE INDEX `idx_land_users_email` ON `land_users` (`email`);
ALTER TABLE `land_reports` ADD `category` text DEFAULT 'unclassified' NOT NULL;
ALTER TABLE `land_reports` ADD `risk` text DEFAULT 'UNKNOWN' NOT NULL;
ALTER TABLE `land_reports` ADD `classified_by` text;

-- Migration: 0006_wild_sue_storm.sql
CREATE TABLE `land_contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`office_name` text NOT NULL,
	`person_name` text DEFAULT '' NOT NULL,
	`district_key` text DEFAULT '' NOT NULL,
	`upazila_key` text DEFAULT '' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`data` text NOT NULL,
	`updated_by` text NOT NULL,
	`updated_at` text NOT NULL
);

CREATE INDEX `idx_land_contacts_area` ON `land_contacts` (`active`,`district_key`,`upazila_key`);
ALTER TABLE `land_reports` ADD `assigned_contact_id` text REFERENCES land_contacts(id);
ALTER TABLE `land_reports` ADD `referral` text;

