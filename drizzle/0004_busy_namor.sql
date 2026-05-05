CREATE TABLE `land_map_cache` (
	`cache_key` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_land_map_cache_expiry` ON `land_map_cache` (`expires_at`);--> statement-breakpoint
CREATE TABLE `land_map_provider_state` (
	`provider` text PRIMARY KEY NOT NULL,
	`last_request_at` integer DEFAULT 0 NOT NULL
);
