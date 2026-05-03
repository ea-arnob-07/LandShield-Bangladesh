ALTER TABLE `cases` ADD `request_id` text;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_cases_owner_request` ON `cases` (`owner`,`request_id`);