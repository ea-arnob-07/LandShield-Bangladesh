# Version 3.5 validation

70 automated tests pass. New integration checks cover submissions in Panchagarh/Tetulia, Barguna/Patharghata, Bandarban/Ruma and Sylhet/Jaintapur without requiring seeded local contacts; automatic shared-area options; admin-only map access; exclusion of private reports and applicant/report-body data; matching area/type/category/risk/status filters in the map and queue; exact unpinned counts; literal wildcard handling; invalid cursors; stable pagination across 503 pins; and assignment-based office filters for a newly added contact outside the seeded areas. The area metadata has no fixed area-count limit. TypeScript and production build are required for publication.

Local browser QA confirms the public map opens on the Bangladesh overview without the old sample-parcel grid, sample role/parcel selectors or sample-plot toggle. Three temporary fictional reports in Sylhet and Barguna validate automatic area options, filtered map/list counts, grouped co-located pins, keyboard popup selection and opening the matching report. Opening a report from the full-screen map closes that map and shows the report. Shared reports without pins remain counted and listed, without invented coordinates. The assigned-office selector lists the actually assigned contact instead of the complete seeded directory.

Light and dark interfaces were inspected. Full-screen map controls now carry their own positioning styles and work when the admin route loads without the legacy land-workspace stylesheet. The admin map and Leaflet load only when expanded; data is fetched in 500-pin batches with visible remaining totals. Local QA records and the temporary local demo-admin role were removed/restored before publication; no production user reports were edited.

No schema migration, dependency, stored-report rewrite or export-layout change is part of this update. The existing application and document examples retain the earlier 3/2-page verified layouts. Physical mobile-device/GPS behavior and a nationwide officer directory are not claimed; the existing source/coverage labels for contacts remain in place.

# Version 3.4 validation

66 automated tests pass, plus TypeScript checking. New coverage validates confirmed land points and coordinate/source/accuracy/time bounds, location persistence and replay, legacy report compatibility, owner isolation, combined area/applicant/risk/type/status filters across two pages, shared-only filter metadata, identical applicant-name separation by account ID, safe literal area filtering, map URLs in Word, explicit GPS success/error handling and independent office map-point sources that preserve admin edits. Current GPS origin is kept separate from the saved land point.

Local browser QA checks the application full-screen map, Bangla and English coordinate entry, clicking a map point, confirmation, reopening, cancellation/Escape, restored focus and retained application text. A prepared report shows its chosen coordinates and map link. Light and dark map controls were visually inspected. The browser denies geolocation on this preview, so the permission-error message and map fallback were checked; successful physical-device GPS and real travel routes are not claimed. Unit fixtures exercise GPS success and distance math. Responsive small-screen rules are present; no physical mobile device was tested.

Admin browser QA uses two temporary fictional local reports and a local-only demo role fixture. District and upazila plus applicant filters narrow to the expected report, the detail view shows its point, and the same-applicant shortcut clears area filters and lists the account's shared reports. The role and the two QA records were restored/removed after the check; production records were not changed by these tests.

Both PDF and DOCX examples were regenerated through the app's exports. Every PDF page and every LibreOffice-rendered Word page was inspected with complete bundled Bengali fonts. The application with chosen point, map URL, office referral/source and full image is three pages in each format. The document example remains two pages in each. No missing glyphs, clipped URL or cropped image was found.

Savar and Patiya office points were checked against named OpenStreetMap primary API objects. Their mapped data dates from 2017 and is explicitly approximate. Unknown office coordinates show no invented distance. The map/Leaflet dependency loads only when the application picker opens. There is no new migration and existing report JSON, consent, sharing and evidence are retained.

# Version 3.3 validation

60 automated tests pass. New integration coverage checks exact land-area matching and Bangla/English aliases, missing/unlisted-area fallbacks, survey-role priority, admin-only directory writes, source confirmation/validation, stale contact edits, report-owner isolation, shared-only referrals, concurrent assignment conflicts, office filters, immutable applicant sections, retained snapshots, inactive/changed-contact review flags and contact details in Word/print exports. Distance calculations and map destinations are checked with explicit coordinate fixtures. Existing account, map, evidence and long-report checks still pass.

Local browser QA confirms area search, proposed contact selection in a newly prepared application, admin assignment on a fictional case, selected name/phone in the list and report, one audit entry, an assigned-person filter returning the matching case, and a source-confirmed directory save. Admin UI uses a temporary local SQLite role fixture, restored after the check; no real login credentials enter browser automation. Contact cards were inspected in light and dark themes. HTTP preview report creation also exposed and verified the secure UUID fallback fix.

Report examples use the app's real export functions with embedded original image bytes. Every page of both PDFs and both LibreOffice-rendered Word files was inspected with the bundled complete Bengali fonts installed. The application example includes a clearly fictional admin referral: PDF and Word are three pages each. The document example is two pages in each format. Contact details wrap correctly and the full original image retains its aspect ratio. The generator now preserves these images when examples are regenerated.

Government contact sources were checked on 2026-10-18; initial local coverage is four upazilas, not a nationwide directory. Seed records have no verified coordinates. Real GPS prompts, travel distance/time, an official's acceptance of a case and government application delivery are not claimed by these checks. Directory edits and referral snapshot updates are separate from official government systems.

# Version 3.2 validation

55 automated tests pass. New cases exercise regular password login for the configured synthetic user, demo ownership/read-only/admin boundaries, image bytes and OOXML internal relationships, uncropped image sizing, PNG and browser-prepared JPEG embedding in PDFs, normal-report page count, image/filename escaping, and waiting for print image decoding. Existing account, privacy, dashboard, pagination, map, routing and long-report checks continue to pass.

Both report examples were generated from the application export functions with a full original image. Every PDF page and every Word page rendered through LibreOffice was visually checked. PDF examples have two pages each; Word has two (document) and three (application). No cropped image, overlapping text or missing image was found.

Local browser QA confirms automatic full-image display in a saved report, enabled exports after preparation, preserved image aspect ratio, and risk shading in light and dark themes. The same file loader covers selected local image files; real camera hardware and a physical mobile device are not part of this check.

# Version 3.1 validation

50 automated tests passed. Dashboard coverage checks shared-only totals across multiple pages, no access for visitors or ordinary users, counts independent of list filters, category totals, matching status/risk shortcuts, exclusion of completed high-risk issues, refreshed counts after decisions, ten varied demo reports with originals, concurrent reseeding and preservation of prior reviews and attachment identities. TypeScript checks pass.

Local browser QA uses a temporary database role fixture for the admin view; no real credentials enter the browser. It checks dashboard rendering in both themes, high-risk and category shortcuts, and opening a priority report with its original attachment and audit history. Small-screen styling is included; a real mobile device is not part of this check.

# Version 3 validation

48 automated tests cover registration, credential hashing/role enforcement, admin reservation, session rotation/logout/expiry, profile/report isolation, repeated-guess limits, demo isolation, classification sharing/CAS/audit, pagination/search, private DOCX downloads, unsafe packages, original evidence, existing map/routing/AI contracts, long-report pagination and print escaping/font readiness.

Compact exports were generated with the same functions used by the app. Both PDF examples and every rendered Word page were visually checked with the complete bundled Bengali fonts installed. PDF fixtures: document 1 page, application 2 pages. Word fixtures: 2 pages each. Long reports exceed 3 pages without dropping their final evidence.

Browser QA in the local preview covered login/demo layouts, demo session and own profile/report history, Word text preview, admin list, high-risk filter, dark theme, report detail, saved category changes, PDF page rendering, page navigation and 150% zoom. Admin UI used a temporary local-only role fixture; real password authentication and authorization were exercised against the actual Worker with SQLite. Print output safety and Bengali font readiness are automated; browser print-dialog rendering and hosted credential entry are not claimed by these checks.

# Validation — LandShield 2.0

## Automated checks

`npm test` exercises the API client and the real Worker handlers with Node SQLite, the local D1 adapter and an isolated object bucket. Coverage includes unauthenticated access, stable Site identity, admin allowlists, consent, owner isolation, shared-only admin review, idempotent report creation, upload signatures / limits, deduplication, rollback, optimistic concurrency, final human review, cross-origin writes and retired civic endpoints. DOCX package integrity, XML escaping, original statements and routing reasons are also tested.

A regression test caught `ক্রেতা` matching inside `বিক্রেতা`; Unicode letter / mark boundaries now separate the labels. Optional AI without a key returns an explicit unavailable result. Provider live behavior is not verified because no key is configured.

`npm run build` runs TypeScript, Vite and the Worker output copier. The supported Sites build helper performs the final publication build. A server render checks that the public home contains the professional hero, 13 service cards, both theme controls and separate account / admin entries.

## Actual OCR check

The local Bengali / English Tesseract model was run against a synthetic, clear printed Bengali deed image. OCR returned readable Bengali with a confidence value around 90, but one plot number was incorrectly read as ১২০৪ instead of ১০৪. This is evidence that confidence is not a guarantee. Mandatory user review and editable fields are retained. Handwriting accuracy, difficult photographs and mobile-camera behavior have not been validated.

## Export inspection

Both deed and application examples were produced by `makePdf` / `makeDocx` from the current application source. Each PDF was rendered with Poppler and every page visually inspected. Both DOCX files were rendered through LibreOffice with the bundled complete Bengali font; every page was inspected. The checked examples have two pages each, readable Bengali shaping, intact section headings, wrapped long text and no cropped text / page overlap.

PDF pages are rasterized for Bengali shaping; PDF text selection is not supported. Word remains editable and searchable. Browser exports still depend on the visitor's Canvas / font-loading support.

## Verification limits

The managed environment did not provide the required control-browser capability, so no alternate browser or preview server was used. Browser-level sign-in redirects, mobile interaction, real camera capture, exact screenshot matching and dark / light pixel rendering remain unverified. Server permissions, data flow and production builds are checked independently.

The original government integration / payments / official registry data are simulations. Sample command-centre totals are derived from sample parcels rather than copied R&D targets. No live government filing, external department delivery, hosted admin allowlist or provider key is currently configured.

## 2.1 map and loading update

The map update adds nine tests for Bangla / English coordinates, invalid geographic ranges, exact normalized sample parcel matching, malformed polygon points, GeoJSON axis order and safe result filtering, anonymous cached search, global concurrent throttling, query validation, unavailable providers, response size and HTTPS endpoint configuration. All 37 tests passed.

The production build separates the map / Leaflet chunk (about 169 KB, 51 KB gzip), the land shell (about 13 KB, 5 KB gzip) and individual modules. The previous land workspace chunk was about 542 KB. Heavy audit, profile, dashboard, document and OCR code is absent from the map's eager module graph. Initial stylesheet output fell from about 145 KB to 45 KB; responsive desktop hero bytes fell by about 93%. These are measured bundle / asset reductions, not browser timing measurements.

The managed environment still has no control-browser capability. Native dialog gestures, focus / Escape, camera / GPS prompts, actual mobile layout and live provider tile / place responses were not browser-tested. A direct provider lookup was not accessible through the available retrieval tool, so provider tests use response fixtures. The interface retains coordinate / location / retry fallbacks and makes external service failures visible.
