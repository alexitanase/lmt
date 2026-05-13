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
- 2026-05-13 — paso 1.1 — Tipos del WS: Sports, EventStatus, EventModel, ActionModel, ThemeConfig, LMTConfig, ConnectionState, LMTPublicEvents, SocketLike, SocketFactory, DEFAULT_ENDPOINT (https://websocket.endpoint/).
- 2026-05-13 — paso 1.2 — SocketClient: wrapper sobre socket.io-client con buffer de listeners (sobreviven reconexión) y verbos del provider (verify_client, client_ready, get_event_details, get_event_h2h).
- 2026-05-13 — paso 1.3 — Controller: orquesta connect → verify_client → verified(ok) → client_ready → constructor → event_details/update_event. Reusa sesión verificada al cambiar de evento.
- 2026-05-13 — paso 1.4 — Store: estado reactivo (connection, partner, theme, event, lastAction, timeline, activeTab). subscribe(), patchTheme(), applyAction() con tope 200.
- 2026-05-13 — paso 1.5 — API pública LMT.create con loadEvent/on/off/setTheme/getState/destroy. Validación eager de partner y container.
- 2026-05-13 — paso 1.6 — 20 tests verdes: store(6) + events(3) + controller(6) + smoke(5). Helper fakeSocket inyectable vía socketFactory.
- 2026-05-13 — playground — actualizado con badge de estado en vivo, log de eventos en panel lateral y botones loadEvent/destroy. UMD 14.66 KB gz incl. socket.io-client.
- 2026-05-13 — paso 2.1/2.2 — Shadow DOM + Preact mount + tokens CSS (bg, primary, accent, pitch, home/away, font, radius). src/ui/{styles.ts, theme.ts, mount.tsx}.
- 2026-05-13 — paso 2.3 — ScoreHeader.tsx: home/away + score parseado de esc + barras de color por equipo.
- 2026-05-13 — paso 2.4 — TabBar.tsx con 5 pestañas (Stats, Player Stats, Timeline, Lineups, Table) controladas vía store.activeTab.
- 2026-05-13 — paso 2.5 — StatusFooter.tsx: detecta possession y muestra "<Team> · In Possession" + pill con estado de conexión.
- 2026-05-13 — paso 2.6 — setTheme reactivo: patchTheme → store notifica → renderShell sincrono → CSS vars actualizadas en el .lmt-root.
- 2026-05-13 — playground — simulador embebido (FakeSocket inline) con botones para constructor/possession/goal/corner/yellow-card/halftime + selector de marca (default/goal99/crimson/ocean) para probar theming. UMD 21.73 KB gz.
- 2026-05-13 — tests UI — 7 tests verdes (shadow DOM, 5 tabs, switch tab, score/teams render, In Possession, theme CSS vars setTheme, destroy limpia shadow). Total 27/27.
- 2026-05-13 — paso 3.1 — soccer/pitch.tsx: pitch SVG top-down (viewBox 1050x680) con áreas, círculo central, manchas, arcos de córner, porterías y stripes.
- 2026-05-13 — paso 3.2 — shared/BallMarker.tsx + shared/PlayerTip.tsx + shared/ActionBanner.tsx (primitivas reutilizables entre deportes).
- 2026-05-13 — paso 3.3 — shared/projection.ts: projectBall() con clamp [0,1] y soporte de strings (per provider examples).
- 2026-05-13 — paso 3.4–3.8 — soccer/actions.ts: 33 acciones del PDF (lotes A core, B ball, C disciplinary, D faltas/penaltis, E extra time). Cada una clasificada como positional/banner/silent con color y short label opcional.
- 2026-05-13 — paso 3.9 — StatsTab.tsx: una fila por entrada de ests (CORNER, YELLOW_CARD, SHOT_ON_TARGET, POSSESSION, etc.) con barra split home/away coloreada por tema.
- 2026-05-13 — paso 3.10 — TimelineTab.tsx: lista reverse-chronological con clock MM:SS + dot coloreado + nombre acción + player.
- 2026-05-13 — paso 3.11 — LineupsTab.tsx: nombres de equipos + hint (feed no provee lineups).
- 2026-05-13 — paso 3.12 — TableTab.tsx: tournament/category/status/period/score/etsc del EVENT_MODEL.
- 2026-05-13 — paso 3.13 — PlayerStatsTab.tsx: agrega timeline por Player → chips por acción.
- 2026-05-13 — sports/registry.ts: soccer (si=1) registrado. PitchStage.tsx selecciona por si o muestra fallback.
- 2026-05-13 — tests Fase 3 — projection(5) + actions(3) + soccer(5) + tabs(5) = 18 nuevos. Total 45/45.
- 2026-05-13 — playground — botones generan BallPosition coherente con la acción y avanza el reloj. UMD 25.95 KB gz.
