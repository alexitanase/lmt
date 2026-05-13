# Progreso del LMT

Bitácora por commit. Una línea por avance.

Formato: `YYYY-MM-DD — paso X.Y — descripción`.

---

- 2026-05-13 — plan — TASKS.md inicial (plan paso a paso, stack elegido, mecanismos de visualización en tiempo real).
- 2026-05-13 — paso 0.1 — package.json con scripts dev/build/test/lint/mock y deps (preact, socket.io-client, vite, vitest, eslint, prettier, tsx).
- 2026-05-13 — paso 0.2 — tsconfig.json (strict, JSX preact) + vite.config.ts (lib mode ESM/CJS/UMD, dev server con HMR sobre playground) + stub src/index.ts + examples/playground.html.
- 2026-05-13 — paso 0.3 — ESLint + Prettier + EditorConfig (.eslintrc.cjs, .prettierrc, .prettierignore, .editorconfig). `npm run lint` en limpio.
- 2026-05-13 — paso 0.4 — Vitest con jsdom y test smoke verde (tests/smoke.test.ts). `npm test` OK.
- 2026-05-13 — verificación — `npm run typecheck`, `npm test`, `npm run lint` y `npm run build` (ESM/CJS/UMD ~0.4 KB) pasan en limpio.
