# Assets and licenses

## Hero photography

`public/landshield-hero.png` is the professional land-workspace photograph generated for the earlier project revision and reused for the corrected land-only project. It depicts a map, papers, a laptop and a Bangladesh flag. Optimized `landshield-hero-800.webp` (62,640 bytes) and `landshield-hero-1600.webp` (182,860 bytes) serve the same scene responsively. The original PNG is 2,512,090 bytes. It contains no official ownership seal or claim of affiliation. The composition supplies the sketch's photographic hero rather than a screenshot of an application.

Original BhumiSeba assets remain available to its retained module / reference implementation, including `public/landtech-hero.png` and `src/assets/`.

## Typefaces

Hind Siliguri and Inter are supplied by the locked `@fontsource` packages, licensed under SIL Open Font License 1.1. Corresponding copyright / license texts are in `docs/licenses/`.

The Bengali and Latin regular / bold Hind Siliguri subsets were merged into complete TrueType fonts for consistent Bengali PDF shaping. These modified fonts have been renamed **LandShield Bangla** and are distributed in `public/fonts/` under the same OFL. Modification: subset merge and family / PostScript renaming; original authors retain their copyright. The original Hind Siliguri copyright and full OFL text are included in `docs/licenses/Hind-Siliguri-OFL.txt`.

The UI also loads local package-provided Hind Siliguri / Inter webfonts. No Google Fonts network request is required. Word export requests LandShield Bangla; installing the bundled TTFs gives the same typeface in Word.

## OCR, PDF and icons

Tesseract.js and tesseract.js-core are Apache-2.0 licensed. The Bengali / English npm wrappers declare MIT in package metadata; their upstream [traineddata repository](https://github.com/naptha/tessdata/blob/gh-pages/LICENSE) is Apache-2.0. Package metadata and the Apache license text are included in `docs/licenses/`. `scripts/prepare-ocr-assets.mjs` copies the installed worker, WASM cores and the two compressed language models into same-origin `public/ocr/` before build; they are included in `dist/client/ocr/` in the delivery ZIP. Generated OCR build assets are excluded from Git source to avoid duplicating the locked dependencies.

PDF.js is Apache-2.0, pdf-lib and fflate are MIT, Lucide icons are ISC, and Leaflet is BSD-2-Clause. Their original distribution license notices remain in the installed packages. The main third-party notices are included in `docs/licenses/`.

## Sample reports

`docs/examples/` contains synthetic reports produced by the current report exporters and a synthetic printed deed image. These examples are not real land records and confer no ownership. The document example's file hash refers to the bundled sample image. The Word examples are editable; the PDF examples contain shaped Bengali page images.

## R&D

`references/Land-Project-RD.docx` is the user-provided source reference. Its content is not an authenticated registry record or a deployed government data connection.
