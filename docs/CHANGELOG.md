## 3.5.0 — 2026-10-18 Nationwide area coverage

- Open the land map on the Bangladesh overview. Remove its fixed sample-parcel cards, sample parcel/role controls and sample plot overlay; preserve the other labelled land simulations.
- Accept applications from any district/upazila. Describe admin area options as areas with submissions; new shared submissions automatically add their entered land area.
- Populate the assigned-office filter from shared case referral snapshots instead of listing all seeded directory contacts. Offices in any area can be added and assigned through the existing directory.
- Add an on-demand admin report map using the same area, applicant, risk, category, type, status, office and search filters as the queue. Open case details from a pin; group co-located reports into a keyboard-accessible choice list.
- Page map points in groups of 500 with explicit totals and load-more. Keep unpinned reports in the list, count them separately and never guess their coordinates. Do not expose private reports or attachment/applicant data through the map endpoint.
- Keep current contact coverage/source labels, report exports, prior stored report JSON and existing admin review history unchanged. No schema migration or new dependency.

## 3.4.0 — 2026-10-18 Application location and area filters

- Add an on-demand full-screen application map with explicit GPS, place search, Bangla/English coordinates, map clicks, draggable pins, confirmation/cancellation and focus restoration.
- Keep the land pin separate from the visitor's current GPS origin. Include the confirmed point, source, timestamp, available uncertainty and map URL in application reports and private/shared persistence.
- Add shared-only admin district/upazila and applicant filters, owner labels and an all-reports-by-this-applicant shortcut that clears unrelated filters.
- Add independently sourced approximate Savar/Patiya office map points without replacing admin edits; calculate current-location distances in browser memory and label straight-line estimates.
- Retain existing reports, ownership, sharing, attachment handling and compact export behavior. Load Leaflet only when the application picker opens.

## 3.3.0 — 2026-10-18 Office contacts and case referrals

- Match land district/upazila and issue type to published office, officer and survey contacts with telephone, address, source date and map directions.
- Seed government-source contacts for Savar, Patiya, Paba and Dumuria, with national land help for unlisted areas. Preserve admin directory edits during reseeding.
- Add an admin directory for verified public office/engineer/professional contacts, versioned edits and deactivation.
- Assign or clear case contacts with a reason, jurisdiction confirmation, optimistic concurrency and audit history; filter the queue by assigned office/person.
- Show selected contact details to report owners and include the saved referral snapshot in PDF, DOCX and print. Flag outdated or inactive directory snapshots without rewriting the applicant's report.
- Keep GPS distance comparisons in the browser and show them only when office coordinates are listed. Address-based directions remain available.
- Fix report UUID creation in HTTP preview with a cryptographically secure fallback; retain HTTPS native UUID support.
- Refresh illustrated report fixtures and their generator with the actual image bytes and a clearly fictional referral example.

## 3.2.0 — 2026-10-18 Demo credentials and illustrated reports

- Enable regular password login for the existing second synthetic user through a server-only demo secret; retain demo write restrictions and role enforcement.
- Add subtle risk-colored backgrounds and edge markers to issue rows in both themes.
- Display full original image attachments automatically in saved and newly prepared reports.
- Embed images in PDF, DOCX and print exports with captions, aspect ratio preservation and safe page fitting. Wait for image preparation and print decoding; offer retry on loading failure.
- Refresh report examples with embedded images; retain the original evidence files separately.

## 3.1.0 — 2026-10-18 Admin dashboard

- Add total, awaiting-review, open high-risk and active-review shortcuts backed by shared-only server aggregates.
- Add clickable category counts and an open high-risk priority list linked to full reports and originals.
- Expand the same four synthetic accounts to ten varied issues with received, reviewing, document-needed, escalated and completed examples.
- Idempotent demo preparation preserves existing report IDs, admin classification, decisions, history and attachment objects; concurrent dashboard requests share seed work.
- Preserve existing account, export, map and dark/light behavior without new dependencies.

## 3.0.0 Accounts and review desk

- Email/password signup and login, profile editing, hashed credentials, revocable cookie sessions and rate limits.
- Reserved admin bootstrap held in runtime secrets; four synthetic demo accounts with original sample files.
- Compact paginated lists, search and type/category/risk/status filters; audited classification with optimistic concurrency.
- Image/PDF/Word original previews, DOCX upload/text extraction, PDF/Word downloads and a separate A4 print view.
- Smaller report body type, tighter spacing, page numbers and untruncated long reports.
- Existing public tools, map work, dark/light themes and platform identity/report ownership retained.

# Changelog

## 2.1.0 — 2026-10-13

- Add map-local input for place names, Bangla / English coordinates, sample ULIDs, dag and khatian numbers.
- Expand the same Leaflet map into a native full-viewport dialog on input focus or live-location activation; add Bangladesh overview, permission / timeout feedback, marker and GPS accuracy circle, Escape / close and focus restoration.
- Preserve the map object and its tile layers across expansion; avoid repeated initialization and debounce size updates.
- Send the site origin on cross-origin tile requests with strict-origin-when-cross-origin, as required by the map provider; browser caching follows provider headers.
- Default to streets and place labels; clear loading on the first base tile, independently load satellite labels, avoid discarding the whole layer for one missing tile and offer retry / external fallback.
- Add a moderated, cached Photon place-search proxy and append-only cache / throttle migration.
- Split every land module, map styles, legacy styles and OCR into on-demand chunks; prefetch map code only on navigation intent.
- Use responsive WebP versions of the existing hero photograph and only Bengali / Latin font subsets.


## 2.0.0 — 2026-10-11

- Focus the entire project on the corrected Land Project R&D and BhumiSeba; remove the earlier generic municipal workflow and reference document.
- Rebuild the public home around the supplied sketch: dark green header, red accents, professional photograph, four metrics and paired application / buyer cards, with light and dark themes.
- Open normal land services and downloadable reports to anonymous visitors; separate user and administrator sign-in entries.
- Replace simulated filename-based deed extraction with real local Bengali / English OCR, PDF text / scanned page processing, editable extracted fields, source hashes and mandatory review.
- Generate real Bengali PDF and editable Word reports for deeds, land applications and buyer checklists.
- Add application office / evidence routing, original statement preservation, survey-source lineage, a sample command centre and practical review steps.
- Add user-owned D1 reports, private R2 attachments, consent-based admin sharing, allowlisted human review, idempotent saves, upload retry, validation, transactional audit history and concurrency guards.
- Add an optional consent-based AI transcription / summary adapter; no hosted provider key has been configured.
- Fix buyer extraction matching the seller label, Bengali / Latin font shaping, report pagination and session-expiration messaging.
- Preserve previous migrations and data while adding the new land tables.
