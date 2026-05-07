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
--> statement-breakpoint
CREATE INDEX `idx_land_contacts_area` ON `land_contacts` (`active`,`district_key`,`upazila_key`);--> statement-breakpoint
ALTER TABLE `land_reports` ADD `assigned_contact_id` text REFERENCES land_contacts(id);--> statement-breakpoint
ALTER TABLE `land_reports` ADD `referral` text;