# Tipspromenad question database

Canonical **data-only** repository for [Android](https://github.com/Nilsson82/Tipspromenad-app-for-Android) and the [participant website](https://github.com/Nilsson82/TipspromenadQuizWebPage). No participant records, hosting API, executable quiz rules, or user accounts belong here.

- `database/revision-1.json`: immutable schema-v2 bank, 30 logical questions. Exactly four source options per translation; 24 questions in en/sv/es and six in all six languages.
- `database/schema.json`: JSON Schema; semantic checks also require unique IDs and valid category references.
- `database/id-registry.json`: permanent numeric IDs, original-source mapping and explicitly added fourth distractors. Never reuse IDs; wording edits keep IDs but produce a new database revision.
- `database/revision-1.sha256`: integrity lock. Published revisions are never overwritten. Keep old revisions available for old quiz QR codes.
- `tests/`: data validation, not application logic. Run `node --test tests/*.test.cjs` using Node 22 or newer. No dependency installation or webpack build is needed.

Five ambiguous/outdated legacy questions are marked deprecated and excluded from new selections pending editorial review. Their data is retained. There are 25 selectable questions in en/sv/es and six in da/no/fi; requesting more produces an explicit error. Legacy answer-sheet templates are not factual questions and remain in the classic web mode.

Translations and inherited facts still need editorial review. The original bank was not fully fact-checked. This revision adds fourth distractors without changing the original correct answers. External legacy images are omitted from the new bank; classic files retain their original references.

The previous webpack app was backed up outside this repository under the Android workspace's `deliverables/Tipspromenad-web-before-database-*.zip` before this conversion. It is no longer part of this data repository; classic quiz functionality remains in QuizWebPage. Review Git's deletions and additions together when committing the conversion. Do not upload participant exports or Android app data.

Distribute updates by adding `revision-N.json`, preserving all old revision files, updating consuming clients and running their compatibility tests. Android's `tools/sync-offline-assets.ps1` copies revision 1 into the website and APK; the clients do not need sibling repositories at runtime.

Licensing: see [the source publication notice](LICENSE), adapted from Nightfall Run. All rights reserved. Third-party rights and permissions previously granted under applicable licenses remain unaffected.

Question provenance is documented in [QUESTION_SOURCES.md](QUESTION_SOURCES.md). The starter source IDs map to permanent numeric IDs 25–30 in database/id-registry.json.
