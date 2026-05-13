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
- 2026-05-13 — paso 4.1 — tools/mock-ws/server.ts: Socket.IO server con CORS abierto que reproduce verify_client → verified → client_ready → constructor → loop update_event cada 2s (ciclo de 23 acciones con players reales y BallPosition coherente). También responde get_event_details, get_events_list y get_event_h2h.
- 2026-05-13 — paso 4.1 — tools/mock-ws/smoke-client.ts: cliente de verificación end-to-end (PORT=4546 ACTIONS=2 → ok).
- 2026-05-13 — paso 4.2 — examples/dashboard.html: dashboard con tracker + panel lateral (Source switcher mock-ws/in-page fake, 14 botones de acción manual, 5 marcas blancas, log WS en streaming). Rebuild en cambio de source, setTheme en cambio de marca.
- 2026-05-13 — paso 4.3 — README.md con integración (script tag + ESM), API table, instrucciones dual-terminal (npm run mock + npm run dev) y layout de carpetas.
- 2026-05-13 — paso 5.1 — Basketball: court FIBA-ish (1400x750) con keys, círculos free-throw, arcos 3pt, hoops + 20 acciones (1/2/3-pts, freethrow*, foul, quarter-1..4, half-end, overtime, etc.).
- 2026-05-13 — paso 5.2 — Ice Hockey: rink con esquinas redondeadas (1500x750), línea roja central, dos líneas azules, creases, 4 face-off circles + 16 acciones (faceoff, puck-dropped, icing, powerplay, pulled-keeper, penalty-shot*, etc.).
- 2026-05-13 — paso 5.3 — Tennis: cancha doubles (1400x700) con net dasheado, líneas singles, service boxes + 17 acciones (serve, point-scored, fault, double-fault, break-points, tie-break, end-of-set, sets badge desde etsc, etc.).
- 2026-05-13 — registry — getSportStage soporta si=1,2,3,4. SUPPORTED_SPORTS exportado. PitchStage ya enruta automáticamente.
- 2026-05-13 — tests Fase 5 — 11 nuevos: registry(2) + basketball(3) + icehockey(3) + tennis(3). Total 56/56.
- 2026-05-13 — dashboard — selector de Sport (Soccer/IceHockey/Basketball/Tennis) que rebuild + crea constructor con si correcto. UMD 27.88 KB gz.
- 2026-05-13 — refactor — `src/sports/shared/createStage.tsx`: helper común que reduce ~50 LOC por deporte. SoccerStage/BasketballStage/IceHockeyStage/TennisStage migrados (clock y sets como Overlays inyectables).
- 2026-05-13 — paso 5.4 — Volleyball (si=6): court 1800x900 con net dasheada, attack lines a 3m, service zones. 9 acciones del PDF (timeout, point-scored, fault, stat, end-of-set, rally, ?-timeout, golden-set, match-ended).
- 2026-05-13 — paso 5.5 — Table Tennis (si=10): mesa 1500x800 con net y center service line. 9 acciones (serve, point-scored, end-of-set, end-of-{1st..4th,final}-set, match-ended).
- 2026-05-13 — paso 5.6 — Handball (si=8): court 1600x800 con arcos 6m y 9m, porterías. 11 acciones (possession, goal, shot, 7m penalty, foul, yellow/red, timeout, halftime/fulltime/match-ended).
- 2026-05-13 — paso 5.6 — Rugby (si=7): pitch 1500x800 con try lines, 22m, halfway, postes H. 10 acciones (try, conversion, penalty, drop-goal, scrum, lineout, halftime, fulltime, match-ended).
- 2026-05-13 — paso 5.6 — Baseball (si=5): diamond 1200x1200 con outfield, infield, mound, bases, foul lines. 9 acciones (hit, strike, ball, out, run, home-run, inning-end, match-ended).
- 2026-05-13 — paso 5.6 — American Football (si=13): field 1600x700 con yard lines cada 10y, end zones tintadas, midfield. 9 acciones (touchdown, field-goal, fumble, interception, quarter-end, halftime/fulltime/match-ended).
- 2026-05-13 — paso 5.6 — Cricket (si=66): oval 1400x1000 con boundary, 30y ring, pitch strip y wickets. 8 acciones (run, four, six, wicket, over-end, innings, match-ended).
- 2026-05-13 — registry — 11 deportes registrados (Soccer/IceHockey/Basketball/Tennis/Baseball/Volleyball/Rugby/Handball/TableTennis/AmericanFootball/Cricket). dashboard.html con selector completo.
- 2026-05-13 — tests Fase 5 cierre — sports-extra.test.ts: 21 tests parametrizados (3 por deporte × 7 deportes). Total 77/77. UMD 30.19 KB gz.
