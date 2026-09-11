# Land Project R&D × BhumiSeba

The source is the newly supplied Land Project R&D, preserved in `references/Land-Project-RD.docx`. Existing BhumiSeba module components are retained. The earlier generic municipal complaint product, task ordering, incident map, service assistant and civic-case API have been removed from the current application.

## R&D coverage

| R&D area | Current project behavior | Operational status |
| --- | --- | --- |
| One parcel identity / ULID | Search and parcel details link location, dag and khatian | Original sample parcels |
| CS / SA / RS / BS / City lineage | Profile lists linked sources and explicitly marks unavailable sources | Illustrative survey data; BS and City share the original BS_CITY sample where applicable |
| Deed digitization and source vault | Real local Bengali / English OCR, selectable-PDF text extraction, scanned-PDF OCR, editing, provenance hashes, PDF / DOCX export | Working public workflow; handwriting requires correction |
| Land applications | Original statement, land identifiers, rule-based office / evidence proposals and report | Working public workflow; not a government filing |
| AI assistance | Optional authenticated, consent-based provider adapter for visible transcription / summary | Implemented; provider key not connected |
| Buyer protection | Seven-question checklist, unknown states, source availability and caution report | Working preparation tool with sample parcel context |
| Fraud / conflict signals | Original statement rules and visible survey / caveat inconsistencies trigger review | Indicators; no definitive ownership / fraud determination |
| Command centre | District-filtered sample risk totals and status context | Concept demonstration; no national live statistics |
| Field-office review | Private shared-report queue, attachments, explanation, human final review and audit history | Working API; hosted admin allowlist still needs configuration |
| Public / private separation | Public preparation and downloads; consent-based private save; allowlisted shared review | Working server permissions |
| Durable evidence | Validated private uploads, SHA-256, deduplication, rollback, report versions and events | D1 / R2 implementation |
| Government authoritative record | Official source links and explicit verification boundary | No registry connection |
| SMS / USSD / IVR, ASR and satellite / InSAR | Discussed as future R&D connections | Not implemented / no live claims |

## Existing modules

The 13 BhumiSeba modules are map, profile, documents, mutation, tax, inheritance, disputes, transaction, erosion, diaspora, audit, sandbox and dashboard. They are accessible without the old login gate. Their demonstration role choices affect only their original sample workflow. A visible banner states that registry data, official fees / payment and government integrations are simulations.

`LandWorkspace` supplies shared parcel and original sample state. The document module now opens the real document studio. Parcel sources enrich the original digital profile; the buyer checklist and application desk are available as additional public land tools. Synthetic NIDs are masked and demonstration emails use `example.invalid`.

## Design interpretation

The previously supplied sketch is the visual reference: dark green / black horizontal header, green brand with red accent, Bangla / EN and light / dark segmented controls, large photographic rectangle with green left shading and red left edge, a bottom-right service badge, four-column white metric strip with green base, and a white application card alongside a dark green insight card. Responsive breakpoints stack these sections and provide a native modal mobile menu.

The layout follows that composition. Exact pixel equality against the screenshot was not verified: the current environment did not expose the required browser QA capability. Bengali PDF / Word reports were independently rendered and inspected.

## Compatibility

The existing Site identity, public audience, D1 / R2 bindings and original migration history are preserved. New `land_reports`, `land_attachments` and `land_events` tables are appended in migration `0003`. Legacy civic tables are no longer used by the application; existing records have not been deleted. The current checkout contains only the corrected Land Project R&D reference.
