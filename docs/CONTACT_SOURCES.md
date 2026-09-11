# Published office contact sources

Checked on 2026-10-18. These entries contain public work contacts from government portals. They are initial contacts for the listed land area and issue categories; current role holders, jurisdiction and the office address must be reconfirmed before visiting. They do not represent acceptance of an individual case.

| Land area | Office or role | Published source |
| --- | --- | --- |
| National | Land service helpline 16122 | https://hotline.land.gov.bd/ |
| Dhaka / Savar | Assistant Commissioner Land, জনাব রাহাত খান | https://acl.savar.dhaka.gov.bd/pages/officers |
| Dhaka / Savar | Surveyor, মোঃ ইমন হাসান | https://acl.savar.dhaka.gov.bd/pages/staff-profiles |
| Chattogram / Patiya | Assistant Commissioner Land, আবদুল্লাহ-আল মামুন | https://acl.patiya.chittagong.gov.bd/pages/officers |
| Rajshahi / Paba | Assistant Commissioner Land, মোহাম্মদ মেহেদী হাসান | https://acl.paba.rajshahi.gov.bd/pages/officers |
| Rajshahi / Paba | Kanungo, বিপুল চন্দ্র সাহা | https://acl.paba.rajshahi.gov.bd/pages/officers |
| Khulna / Dumuria | Assistant Commissioner Land, অমিত কুমার বিশ্বাস | https://acl.dumuria.khulna.gov.bd/pages/officers/6980cd95c4774958d7c58e76 |

Exact published work phones and available emails are in `server/contact-seeds.js`. Address labels identify the named office, upazila and district; no street number or precise coordinate was inferred. Contact seeds retain null coordinates. A separate map projection now provides approximate OpenStreetMap points for untouched source-seeded Savar and Patiya entries. The original office/contact source remains separate from the map-point source. Unknown points continue to use address directions and show no numeric distance.

The runtime seeds missing IDs once with INSERT OR IGNORE and preserves admin edits. Admins can add further published government or professional/engineer contacts, update sources and dates, or deactivate obsolete entries. Changes are versioned; existing report referrals preserve the selected snapshot and indicate when it needs review. No private professional contact or invented engineer has been seeded.

## Office map points checked on 2026-10-18

| Office | Map object | Approximate point |
| --- | --- | --- |
| Savar AC Land office and its listed surveyor | https://www.openstreetmap.org/node/5240549386 | 23.834225, 90.2576536 |
| Patiya Land office | https://www.openstreetmap.org/way/530200683 | 22.296936, 91.97649565 |

Coordinates and matching office names were inspected in the OpenStreetMap primary API at `https://api.openstreetmap.org/api/0.6/node/5240549386.json` and `https://api.openstreetmap.org/api/0.6/way/530200683/full.json`. Patiya's point is the mean of its four distinct building nodes. Both objects were last edited in 2017; they are approximate mapped positions, not a recent survey or a government-certified entrance. The interface provides the source link and asks visitors to confirm before visiting. Paba and Dumuria have no mapped point in this update.

The projection in `server/office-locations.js` applies only to unedited source records without coordinates. It does not rewrite stored directory rows or earlier referral snapshots. Admin edits/deactivation remain authoritative. OpenStreetMap data attribution: © OpenStreetMap contributors, https://www.openstreetmap.org/copyright .
