# Live Match Tracker (LMT) — Plan de Tareas

> Documento operativo: lista las tareas paso a paso para construir el LMT.
> Cada paso tiene **objetivo**, **archivos**, **criterio de aceptación** y se
> marca como `[ ]` pendiente, `[~]` en curso o `[x]` completado. Al cerrar
> cada paso se actualiza este fichero y se hace commit.

---

## 1. Resumen

Librería JS embebible que renderiza un Live Match Tracker en un `<div>` del
sitio host. Pintada con **SVG**, alimentada por **WebSocket (Socket.IO 4.5.4)**
según la doc proporcionada. Soporta marca blanca configurable en la
inicialización. El sitio host es responsable de su propia cabecera; el LMT
sólo dibuja: cuadro de marcador + pestañas (Stats / Player Stats / Timeline /
Lineups / Table) + campo SVG + barra de status.

**No auto-inicializa.** Se instancia explícitamente:

```js
const lmt = LMT.create({ container, partner, theme });
lmt.loadEvent('123456');
```

---

## 2. Stack tecnológico (decidido)

| Capa | Elección | Motivo |
|---|---|---|
| Lenguaje | **TypeScript** | tipos sobre los modelos del WS (EVENT_MODEL, ACTION_MODEL) |
| UI | **Preact + JSX** | ~3 KB gz, componentes para vistas complejas (tabs, stats) |
| Render gráfico | **SVG inline** vía JSX | escalable, animable, sin canvas |
| Animaciones | **Web Animations API** | nativa, sin libs extra |
| Aislamiento | **Shadow DOM** | no choca con CSS del host |
| Theming | **CSS custom properties** | runtime override, presets por marca |
| Conectividad | **socket.io-client 4.x** | el servidor es Socket.IO 4.5.4 |
| Build | **Vite + Rollup** | dev server con HMR + 3 salidas |
| Salidas | `lmt.umd.js`, `lmt.esm.js`, `lmt.cjs.js` + `lmt.min.js` |
| Tests | **Vitest** | unitarios para socket/store, snapshots SVG |
| Lint/format | **ESLint + Prettier** | estándar |

**Endpoint WebSocket** (según la doc): `https://websocket.endpoint/`
**Versión Socket.IO server**: 4.5.4

---

## 3. Visualización del progreso en tiempo real

Para poder ver los cambios y el avance en vivo se montan **tres mecanismos**:

### 3.1 Playground con HMR
`examples/playground.html` cargado por `vite dev` (puerto 5173). Cualquier
cambio en código recarga el tracker en pantalla sin perder el estado del
evento simulado.

```bash
npm run dev
# abre http://localhost:5173/examples/playground.html
```

### 3.2 Dashboard de desarrollo
`examples/dashboard.html`: pantalla partida con el tracker a la izquierda y
un **panel lateral** a la derecha con:
- selector de marca blanca (cambia colores/logo en caliente),
- log en streaming de mensajes WS recibidos,
- botones para disparar acciones manualmente (`goal`, `corner`, `possession`,
  `yellow-card`, ...) contra el **mock server** sin necesidad del endpoint real,
- selector de deporte y de `EventId`.

### 3.3 Mock WebSocket server
`tools/mock-ws/` — servidor Socket.IO local que imita el flujo del PDF
(`verify_client` → `verified` → `client_ready` → `constructor` →
`update_event` periódico). Permite trabajar offline.

```bash
npm run mock
# levanta ws://localhost:4545 con datos simulados
```

### 3.4 Tablero de progreso
- Este `TASKS.md` se actualiza al cerrar cada paso (commit por paso o por
  bloque pequeño).
- `PROGRESS.md` añade una línea por commit con fecha y descripción corta.
- Rama de trabajo: **`claude/live-match-tracker-plan-7uiYy`** (push tras
  cada paso).

---

## 4. Estructura final de carpetas

```
lmt/
├── src/
│   ├── index.ts                  API pública (LMT.create)
│   ├── core/
│   │   ├── controller.ts         orquestación del workflow
│   │   ├── socket.ts             wrapper Socket.IO + reconexión
│   │   ├── store.ts              estado normalizado
│   │   ├── events.ts             emisor de eventos al consumidor
│   │   └── types.ts              EVENT_MODEL, ACTION_MODEL, configs
│   ├── ui/
│   │   ├── Shell.tsx             layout raíz (Shadow DOM)
│   │   ├── ScoreHeader.tsx       marcador
│   │   ├── TabBar.tsx
│   │   ├── tabs/
│   │   │   ├── StatsTab.tsx
│   │   │   ├── PlayerStatsTab.tsx
│   │   │   ├── TimelineTab.tsx
│   │   │   ├── LineupsTab.tsx
│   │   │   └── TableTab.tsx
│   │   ├── StatusFooter.tsx      "In Possession"
│   │   └── PitchStage.tsx        carga perezosa del módulo de deporte
│   ├── sports/
│   │   ├── registry.ts
│   │   ├── shared/               primitivas (BallMarker, PlayerTip, ...)
│   │   ├── soccer/
│   │   │   ├── pitch.tsx
│   │   │   ├── actions.ts        mapa action→render
│   │   │   └── actions/*.ts
│   │   ├── basketball/
│   │   ├── icehockey/
│   │   ├── tennis/
│   │   └── ...
│   ├── theme/
│   │   ├── tokens.ts
│   │   └── presets/goal99.json
│   ├── i18n/
│   │   ├── es.json
│   │   └── en.json
│   └── utils/
├── examples/
│   ├── playground.html
│   ├── dashboard.html
│   └── basic.html
├── tools/
│   └── mock-ws/                  servidor Socket.IO de prueba
├── tests/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── PROGRESS.md
└── TASKS.md
```

---

## 5. Fases y pasos

Convención por paso:
- **Objetivo**: qué se entrega.
- **Archivos**: rutas tocadas.
- **Aceptación**: cómo se valida.

### FASE 0 — Bootstrap del proyecto

- [x] **0.1 Inicializar `package.json`**
  - Objetivo: paquete `@lmt/tracker`, scripts `dev`, `build`, `mock`, `test`, `lint`.
  - Archivos: `package.json`.
  - Aceptación: `npm install` instala sin errores. ✅

- [x] **0.2 Configurar TypeScript + Vite + Preact**
  - Objetivo: build de demo arranca con `npm run dev`.
  - Archivos: `tsconfig.json`, `vite.config.ts`, `src/index.ts` (stub).
  - Aceptación: `npm run dev` abre `examples/playground.html` con un "Hello LMT". ✅

- [x] **0.3 ESLint + Prettier + EditorConfig**
  - Archivos: `.eslintrc.cjs`, `.prettierrc`, `.editorconfig`.
  - Aceptación: `npm run lint` pasa en limpio. ✅

- [x] **0.4 Vitest + un test verde**
  - Aceptación: `npm test` pasa. ✅

- [x] **0.5 `PROGRESS.md` inicial + commit "chore: bootstrap"** ✅

### FASE 1 — Núcleo de conectividad y API pública

- [x] **1.1 Tipos del WS** ✅
  - `src/core/types.ts`: `EventModel`, `ActionModel`, `LMTConfig`, `Theme`, enums de Sport/Status.
- [x] **1.2 `SocketClient`** ✅
  - Conexión a Socket.IO con reconexión + backoff; listeners persisten en reconexión.
  - Métodos: `verifyClient(partner)`, `clientReady(eventId)`, `getEventDetails`, `getEventH2H`, `on`/`off`.
- [x] **1.3 `Controller`** ✅
  - Orquesta: `connect → verify_client → verified(ok) → client_ready → constructor → update_event loop`.
  - Re-emit en cambio de evento sin re-verificar.
- [x] **1.4 `Store`** ✅
  - Estado: `connection`, `partner`, `theme`, `event`, `lastAction`, `timeline`, `activeTab`.
  - `subscribe`, `setState`, `patchTheme`, `applyAction` (tope 200 timeline).
- [x] **1.5 API pública `LMT.create`** ✅
  - `loadEvent`, `on`, `off`, `setTheme`, `getState`, `destroy`.
  - Validación de `partner` y `container` obligatorios.
- [x] **1.6 Tests del controller con mock socket** ✅
  - 20 tests verdes (store 6 + events 3 + controller 6 + smoke 5).

### FASE 2 — Shell visual + theming

- [x] **2.1 Shell con Shadow DOM** ✅
  - Mount Preact en un shadow root con re-render síncrono ante cambios del store.
- [x] **2.2 Tokens CSS y preset por defecto** ✅
  - `--lmt-bg`, `--lmt-primary`, `--lmt-accent`, `--lmt-pitch-1/2`, `--lmt-home`, `--lmt-away`, `--lmt-font`, `--lmt-radius`, etc.
- [x] **2.3 `ScoreHeader`** ✅
  - Nombres + marcador parseado de `esc` + barras de color por equipo (home/away).
- [x] **2.4 `TabBar`** ✅
  - 5 pestañas controladas via store.activeTab: Stats / Player Stats / Timeline / Lineups / Table.
- [x] **2.5 `StatusFooter`** ✅
  - Detecta `possession` y muestra "<Team> · In Possession" + pill con estado de conexión.
- [x] **2.6 `setTheme` en caliente** ✅
  - `patchTheme` → re-render síncrono → CSS vars actualizadas. Tests verifican `--lmt-primary`.

### FASE 3 — Soccer (deporte de la captura)

- [x] **3.1 `soccer/pitch.tsx`** ✅ Campo SVG top-down (1050×680) con áreas, círculo, manchas, arcos, porterías y stripes.
- [x] **3.2 `BallMarker` + `PlayerTip` compartidos** ✅ + `ActionBanner` para overlays.
- [x] **3.3 Proyección `BallPosition` → coords SVG** ✅ con clamp y soporte string.
- [x] **3.4 Acciones core (lote A)** ✅ possession, attack, danger-attack, kickoff, halftime, second-half, fulltime, match-ended.
- [x] **3.5 Acciones de balón (lote B)** ✅ goal, goal-kick, corner, throw, shot-on-target, shot-off-target, offside.
- [x] **3.6 Acciones disciplinarias (lote C)** ✅ yellow-card, red-card, injury, injury-time, substitution, var, disallowed-goal.
- [x] **3.7 Faltas y penaltis (lote D)** ✅ safe-free-kick, danger-free-kick, penalty, penalty-shoot, penalty-take, penalty-missing, penalty-scored.
- [x] **3.8 Tiempos extra (lote E)** ✅ extra-time-1, extra-time-ht, extra-time-2, extra-time-ended.
- [x] **3.9 Pestaña `Stats` con `ests`** ✅ una fila por stat + barra split home/away coloreada.
- [x] **3.10 Pestaña `Timeline`** ✅ lista reverse-chronological con MM:SS + dot color + acción + player.
- [x] **3.11 Pestaña `Lineups`** ✅ nombres de equipos + hint.
- [x] **3.12 Pestaña `Table`** ✅ tournament/category/status/period/score/etsc del EVENT_MODEL.
- [x] **3.13 Pestaña `Player Stats`** ✅ agrega timeline por Player → chips por acción.

### FASE 4 — Mock server + dashboard de pruebas

- [x] **4.1 `tools/mock-ws/server.ts`** ✅
  - Socket.IO server local en puerto 4545 (PORT overridable). Maneja
    verify_client, client_ready, get_event_details, get_events_list,
    get_event_h2h. Streamea update_event cada 2s con BallPosition
    coherente con la acción (corner→esquina, goal-kick→área, etc.).
  - Verificado e2e con `tools/mock-ws/smoke-client.ts`.
- [x] **4.2 `examples/dashboard.html`** ✅
  - Tracker en panel principal + panel lateral con: Source switcher
    (mock-ws / in-page fake), EventId, 14 botones de acción manual
    (active sólo en fake), selector de 5 marcas (default / Goal99 /
    Crimson / Ocean / Amber), log WS en streaming. setTheme reactivo
    en cambio de marca, rebuild en cambio de source.
- [x] **4.3 Documentar `npm run mock` + `npm run dev`** ✅
  - README.md con guía de integración, API, dos-terminales para el
    dashboard en vivo, layout de carpetas.

### FASE 5 — Más deportes

- [x] **5.1 Basketball** ✅ Court FIBA-ish (1400×750) con keys, free-throw, arcos 3pt, hoops + 20 acciones (1/2/3-pts, freethrow/scored/missed, foul, quarter-1..4, half-end, overtime, …).
- [x] **5.2 Ice Hockey** ✅ Rink con esquinas redondeadas (1500×750), red line, blue lines, creases, 4 face-off circles + 16 acciones (faceoff, puck-dropped, icing, powerplay, pulled-keeper, penalty-shot/missed/overplay, …).
- [x] **5.3 Tennis** ✅ Cancha doubles (1400×700) con net dasheado, líneas singles, service boxes, badge de sets desde `etsc` + 17 acciones (serve, point-scored, fault, double-fault, break-points, tie-break, end-of-set, …).
- [ ] **5.4 Volleyball**
- [ ] **5.5 Table Tennis**
- [ ] **5.6 Handball / Rugby / Baseball / American Football / Cricket**

### FASE 6 — Empaquetado y release

- [ ] **6.1 Build UMD/ESM/CJS + `lmt.min.js`**
- [ ] **6.2 Tipos `.d.ts` exportados**
- [ ] **6.3 README** con ejemplos de integración (script tag + ESM).
- [ ] **6.4 CHANGELOG** y versión `0.1.0`.
- [ ] **6.5 Ejemplo en `examples/basic.html` listo para CDN.**

---

## 6. Definition of Done global

- `LMT.create({...}).loadEvent(id)` carga y anima un partido real o
  simulado.
- 5 pestañas funcionando.
- Soccer 100 % de la lista de acciones de la doc.
- Marca blanca configurable en `create()` y mutable con `setTheme`.
- Shadow DOM: no se filtran estilos al host.
- Bundle UMD < 80 KB gz (núcleo + soccer); deportes extra se cargan
  perezosamente.
- Tests verdes, lint en limpio, doc de uso publicada.

---

## 7. Bitácora

Se mantiene en `PROGRESS.md` con una línea por commit:
`YYYY-MM-DD HH:MM — paso X.Y — descripción corta`.
