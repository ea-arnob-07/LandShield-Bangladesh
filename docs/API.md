# Accounts and report review API

Mutations enforce same-origin checks. Auth JSON is bounded to 4 KB. Secure cookie sessions resolve before optional trusted Sites identity headers. All report and original-file ownership checks run on the server.

| Route | Access and behavior |
| --- | --- |
| `POST /api/auth/register` | Public; name/email/password and optional phone/district/address; role always user |
| `POST /api/auth/login` | Public; email/password and optional admin=true; returns user and HttpOnly session cookie. The configured second demo user also accepts its demo password and remains read-only. |
| `POST /api/auth/logout` | Revokes current cookie session |
| `GET /api/auth/platform-sso` | Clears custom cookie and redirects to platform-owned sign-in flow |
| `GET /api/auth/demos` | Idempotently prepares and lists four public synthetic accounts |
| `POST /api/auth/demo` | Selects index 0–3 only; read-only sample account, never admin |
| `PATCH /api/auth/profile` | Own password account only; cannot change email/role/ID |
| `GET /api/reports` | Own records; paginated in groups of 30 |
| `GET /api/admin/queue` | Admin only; explicitly shared records; ensures demo samples are available |
| `GET /api/admin/report-map` | Admin only; filtered shared report pin summaries, location counts and 500-point cursor pagination |
| `GET /api/admin/report-filters` | Admin only; land district/upazila counts, applicant choices and actually assigned contacts from shared reports only |
| `GET /api/admin/overview` | Admin only; shared-only aggregate counts, category totals and at most three open high-risk records |
| `GET /api/contacts` | Public; active contacts matching land district, upazila and category, plus national help |
| `GET /api/admin/contacts` | Admin only; active and inactive directory with optional q/category search |
| `POST /api/admin/contacts` | Admin only; source-confirmed contact creation |
| `PATCH /api/admin/contacts/:id` | Admin only; source-confirmed edit/deactivation with contact version |
| `GET /api/reports/:id` | Owner or admin for shared reports; report, attachment links, audit history |
| `PATCH /api/reports/:id/referral` | Admin/shared only; contact selection/clearing with report and contact versions, reason, confirmation and audit history |
| `PATCH /api/reports/:id/classification` | Admin/shared only; version/category/risk; audit event and CAS conflict handling |
| `PATCH /api/reports/:id/status` | Admin/shared only; version/status/note/humanReviewed; existing final-review rules |
| `POST /api/reports/:id/attachments` | Owner only; bounded original files, content validation, SHA-256 deduplication |
| `GET /api/attachments/:id` | Authorized owner or shared admin; private no-store download |

Lists accept `q`, `kind`, `category`, `risk`, `status`, `officeId`, `district`, `upazila`, `applicantId` and opaque `before` cursor returned as `nextCursor`; response is `{items,total,nextCursor}`. Status also accepts `active` (reviewing / needs_documents / escalated) and `open` (all except resolved / rejected). Overview ignores list filters and cursors: `{counts:{total,pending,highRisk,active,resolved,demoCount},byCategory:[{category,count}],urgent:[record]}`. `pending` means received; `highRisk` excludes resolved / rejected. Demo preparation adds ten fictional issues to the existing four demo accounts without overwriting reviews. List payloads omit report sections; detail requests return full text. Admin classification is saved separately from the original applicant report, with actor and reason in history.

DOCX uploads must have valid bounded ZIP central-directory metadata, content types and document XML; encrypted, macro, ActiveX, embedded-object, traversal or oversized packages are rejected. Browser Word preview renders text only. PDF preview uses a lazy PDF.js worker and one page at a time, avoiding browser plug-in or iframe restrictions.

# LandShield API

## Office directory and referral details

`report.location` can include `point:{latitude,longitude,label,source,capturedAt,accuracy?}` alongside `district`/`upazila`. Sources are `gps`, `map`, `search` or `coordinates`; numeric latitude/longitude must be finite and within global coordinate ranges, the label is bounded to 300 characters, the time must parse, and optional GPS accuracy is non-negative and bounded. Unrecognized point fields are discarded. Old reports without a point still work. The application puts the confirmed land point and map URL in export text; live origin for office-distance calculations is kept separately in browser memory.

Report lists accept exact, case-insensitive trimmed `district` and `upazila` filters (100 characters each), `__missing__` for a missing area, and `applicantId` (200 characters) for the authenticated report owner. These combine with all existing filters and cursors. Owner/sharing constraints apply before every filter. Applicant identity uses the account ID rather than the free-form applicant name.

`GET /admin/report-filters` returns `{areas:[{district,upazila,total}],applicants:[{id,name,total}],offices:[{id,officeName,personName,designation,total}]}` with shared-only aggregates, with all submitted area pairs and up to 500 applicants / 500 assigned contacts. These are submitted report areas, not an allowlist of supported places; applications may contain any district/upazila. Assigned contacts come from the most recently updated shared referral snapshot for each contact ID, including previously assigned contacts that are no longer active in the directory. The detail shortcut can filter an exact owner even if absent from those bounded options. Non-admins cannot list these metadata. List/detail records expose `applicant:{id,name}` for the report owner. No database migration or rewrite of existing reports is needed.

Office results may expose `coordinateSourceUrl`/`coordinateCheckedAt` independently of their government contact source. The known Savar/Patiya OpenStreetMap points enrich untouched source-seeded directory entries; admin-edited coordinates, including an intentional clearing, are retained. Optional coordinate-source HTTPS links are supported on admin edits. Unknown office coordinates produce no numeric distance. The browser uses Haversine straight-line estimates, not travel-time or road-route claims.

`GET /contacts` accepts `district`, `upazila`, `category` and optional `q`. Both land-area fields are required for local suggestions. Supported categories are the report categories. Responses are `{items,coverage,total}`, where coverage is `local`, `not_listed` or `area_required`. Public responses contain active entries only. Missing or unlisted areas receive national help, with no invented nearby office. Survey contacts are prioritized for boundary/record issues. Initial verified coverage and source dates are documented in `CONTACT_SOURCES.md`.

Admin directory writes accept `{contact,confirmed:true,version?}`. Contact data includes office/person/designation, district/upazila/address, published phone/mobile/email, categories, government/professional source type, HTTPS source URL, source-check date, active flag, notes and optional paired Bangladesh coordinates. Government sources must use a gov.bd hostname. Edits require the current integer contact version; stale edits return 409. Deactivate obsolete entries rather than deleting their history. Contact IDs in route segments must be URL encoded. Directory reads are capped at 500 entries.

`PATCH /reports/:id/referral` accepts `{version,contactId,contactVersion,note,confirmed:true}`. `version` is the report revision; `contactVersion` is the current active directory revision. A note of 8-2,000 characters and jurisdiction confirmation are required. To clear, pass `contactId:null` with a reason and confirmation. Only admins of explicitly shared records may assign or clear. The write checks report and contact versions atomically and adds one `referred` audit event. Stale decisions return 409.

Saved records expose `assignedContactId` and `referral:{contact,note,assignedBy,assignedAt}`. The referral is a snapshot; directory edits do not change an applicant's original report or a previous selection. Detail reads add `needsReview` when the contact version changed or became inactive. PDF/Word/print compose this snapshot as an extra section. `officeId` list filters accept `all`, `assigned`, `unassigned` or an exact contact ID; other owner/sharing filters still apply. Optional report `location:{district,upazila}` refers to the land, not the user's profile address. GPS distance calculations stay in the browser; no location is included in directory requests.

These are workspace contact recommendations and review assignments. They neither transmit an application to government offices nor confirm an official accepted a case.

All paths below have the `/api` prefix. JSON errors return `{ "error": "বাংলা বার্তা" }` with a relevant HTTP status. The application and API share one origin. State changes reject an unrelated Origin. No user ID or role supplied in JSON is trusted.

| Method and path | Access | Result |
| --- | --- | --- |
| `GET /health` | Public | Storage and optional AI availability |
| `GET /map/search?q=<place>` | Public | Up to five Bangladesh place results from cached Photon / OSM data |
| `GET /session` | Public | Authenticated user / null; server-derived admin flag; AI availability |
| `POST /land/analyze` | Public | Rule-based suggested category, office, evidence, risk, reasons and next steps |
| `POST /ai/structure` | Signed in, configured key, explicit AI consent | Transcript and summary from the optional AI provider |
| `GET /reports` | Signed in | Own reports only, 30 per page |
| `POST /reports` | Signed in, storage consent | Persist a validated report; `shared` must explicitly be true or false |
| `GET /reports/:id` | Owner or authorized admin of a shared report | Report, attachment metadata and event history |
| `POST /reports/:id/attachments` | Owner only | Validated original file upload and SHA-256 metadata |
| `PATCH /reports/:id/status` | Authorized admin of a shared report | Reasoned human review with version checking |
| `GET /attachments/:id` | Owner or authorized admin of a shared report | Private downloadable original file |
| `GET /admin/queue` | Authorized admin | Explicitly shared reports, 30 per page |

## Report persistence

`POST /reports` accepts `{report, consent: true, shared: boolean}`. `report` has an `LSR-<UUID>` ID, kind `document`, `application` or `buyer`, title, ISO creation time, summary, engine and sections of heading / rows. Rows contain text `value` and an optional text `label`. Validate with `server/land-storage.js`; excessive size, malformed identifiers or missing required fields are rejected.

A replay of the same report ID, owner and canonical payload returns the saved record without another creation event. A changed payload with the same ID returns 409. Consent to save and consent to admin access are independent. Normal users cannot list other accounts' records, including shared records.

## Original files

Attachment requests are multipart forms with a `file` field. Each file is at most 10 MB; at most ten original files may be attached to one report. The multipart stream is bounded before parsing. Accepted signatures are JPEG, PNG, WebP, PDF, UTF-8 TXT, MP4 and WebM. SVG / executable uploads are rejected. UTF-8 TXT does not imply the content has been independently verified.

The server computes SHA-256 and deduplicates the same report / owner / bytes. R2 objects are written under random internal keys, never public asset URLs. Failed metadata transactions clean up newly written objects. Attachment responses use private no-store caching, nosniff, sandbox and attachment disposition. A user can retry pending uploads after the report itself has saved.

## Human review

A status change accepts `{status, note, humanReviewed, version}`. States are `received`, `reviewing`, `needs_documents`, `escalated`, `resolved`, `rejected`. Notes must explain the change. `resolved` and `rejected` require `humanReviewed: true`; final states cannot be edited further. The version acts as a compare-and-swap guard: a stale review returns 409, without a duplicate audit event.

Hosted admin authority comes from the reserved password bootstrap role, or `SITE_ADMIN_USER_IDS` with the trusted Site user ID. Ordinary signup and demo accounts never receive that role. The original BhumiSeba role picker is a labelled simulation and grants no server authority. Retired civic-case and demo-role API routes return 404.

## Optional AI

`POST /ai/structure` accepts `{kind: "document" | "application", text, consent: true, image?}`. Text is limited to 18,000 characters. The optional image is a bounded PNG / JPEG / WebP base64 data URL. The UI sends the first selected photo at reduced resolution and explains separate provider-processing consent. The OpenAI Responses API uses strict JSON output for `transcript` and `summary`; malformed or unavailable results return an error while preserving the user's draft.

The provider timeout is 40 seconds; AI frontend requests allow 45 seconds. Other requests allow 15 seconds. Without a key the route returns 503 and the UI keeps normal OCR / rule-based actions available. No key is currently configured on the hosted Site.

## Place search

Place queries are 3–180 characters. `GET /map/search` returns `{items, source, cached}`; each item contains `id`, `label`, `lat`, `lng`. Only a Search submission triggers provider traffic. GPS, coordinate inputs and known sample land IDs are handled in the browser.

The fixed Photon HTTPS endpoint can be changed only via the server `PHOTON_ENDPOINT` setting. Requests identify this application, limit results to five, filter to Bangladesh, have a six-second provider timeout and bound the response to 100 KB. Geometry must be a finite Point, with GeoJSON longitude / latitude converted correctly. Query hashes and public place results are cached for 24 hours, capped at 500 entries. A D1 compare-and-swap gate limits all uncached website requests to one per 1.2 seconds. Concurrent excess requests return 429. Invalid queries return 400, unavailable providers return 502, and an invalid server endpoint returns 503.

The public cache / gate tables are added in migration `0004_busy_namor.sql`; no existing private records are changed. Photon usage and API documentation: https://github.com/komoot/photon and https://github.com/komoot/photon/blob/master/docs/api-v1.md . This application does not use the public Nominatim search API.

Map-page assets use `strict-origin-when-cross-origin`: external map requests identify the public Site origin. OpenStreetMap requires a valid Referer for browser tiles: https://operations.osmfoundation.org/policies/tiles/ . GPS and entered coordinates remain in the browser; map providers receive the viewport tile requests needed to display that area.


## Nationwide admin map

`GET /admin/report-map` accepts the same filters as `/admin/queue` (`q`, `kind`, `category`, `risk`, `status`, `officeId`, `district`, `upazila`, `applicantId`) and the same opaque `before` cursor. It returns `{items,total,located,unlocated,nextCursor}`. Each item contains only `id,title,risk,status,createdAt,district,upazila,latitude,longitude`. No report body, applicant details or attachments are included. Server authorization requires an admin and `shared=1` for every aggregate and point.

`total` includes all matching shared reports; `located` includes only finite numeric point coordinates in the accepted ranges; `unlocated=total-located`. At most 500 points are returned per request, ordered by creation time and ID, with a continuation cursor when more exist. Counts are for the whole matching set, not the current page. A report without a pin can still be found by its entered district/upazila. No district-centre coordinate is substituted. The UI fetches these points and loads Leaflet only when the admin opens the map.

The public land map starts with the Bangladesh overview and supports place/GPS/coordinate search without showing the old sample-parcel grid or any submitted report pins. Private/shared report coordinates never become anonymous public map data.
