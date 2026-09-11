# Tipspromenad

Incremental update of `Nilsson82/Tipspromenad`. This remains the existing webpack/plain-JavaScript application. Original twelve Swedish questions and answer order are preserved in `public/Data/legacy_sv.json`; `src/data.js` retains a compatible export.

## Languages and play

UI/question languages are independent: English (`en`), Swedish (`sv`), Spanish (`es`), Danish (`da`), Norwegian Bokmål (`no`), Finnish (`fi`). Aliases `se`/`dk`, `nb`/`nn` and regional tags normalize to canonical codes. UI falls back to English; question content does not.

The original Swedish quiz remains available in Swedish. A shared six-question starter is available in all six languages; other languages do not pretend to translate the original twelve. All questions appear together and are corrected on submission. Browser storage restores answers/results against an unchanged data fingerprint. Query example: `?ui=es&quizLang=sv`.

## Build, test and run

Node.js 18 or later, npm; preserve `package-lock.json`:

```sh
npm ci
npm test
npm run build
npm run preview
```

Production preview: `http://127.0.0.1:8081`. `npm start` runs webpack's development server. Build output is `dist/`, including HTML, JavaScript, CSS, translations and data. Commands now use `src/webpack.config.js`; paths, webpack-dev-server settings and the undeclared Express preview dependency were corrected.

The inherited lockfile was preserved. Installation reported 38 audit findings (6 low, 11 moderate, 18 high, 3 critical). No forced major upgrades were applied; review these separately before exposing development tooling. The published quiz is static.

## Upload

Commit/upload source and updated `dist/` to the existing `Nilsson82/Tipspromenad` repository when ready. No push or publication occurred. For GitHub Pages, configure a Pages workflow to publish **`dist/`** as its artifact. `public/index.html` is the webpack input template, not the finished page. Relative assets work under a repository path such as `/Tipspromenad/`.

ZIP delivery contains source and production output, excluding `.git` and `node_modules`. Run `npm ci` after extraction to rebuild. Alternatively deploy only `dist/` contents to any static host.

## Shared source and retained code

`src/index.js` uses `public/lib/`, `public/locales/ui.json` and `public/Data/multilingual.json`. Canonical source: the existing **TipspromenadQuizWebPage** project. Edit there, then run Android's `tools/sync-web-assets.ps1`; `-Check` verifies hashes. The distribution is independently deployable without filesystem dependencies on another repository.

`src/script.js` and `style.css` remain unused historical files. React dependencies already existed; this update adds no React components or framework migration.

See `docs/ARCHITECTURE.md` and `docs/contracts/README.md`. Original questions need factual/editorial review; data was preserved rather than declared fully verified. New translations have not had native-editor review. GPS, QR, organizers and guaranteed offline play remain future phases.
