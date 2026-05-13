# LMT — Live Match Tracker

Embeddable JS library that renders a live match tracker in a `<div>` of the
host site. SVG-based stage per sport, fed by the provider WebSocket
(Socket.IO 4.5.4) documented in the project PDF. Configurable per
white-label brand at instantiation.

> Status: **Fase 4** — core + Shadow DOM shell + soccer pitch (33 actions) +
> 5 populated tabs + mock server and dev dashboard. Other sports (Fase 5)
> and release packaging (Fase 6) are pending. See [`TASKS.md`](./TASKS.md)
> for the full plan and [`PROGRESS.md`](./PROGRESS.md) for the bitácora.

## Stack

TypeScript, Preact (~3 KB gz), Vite (lib mode: ESM/CJS/UMD), Shadow DOM,
CSS custom properties, Web Animations, `socket.io-client` 4.x, Vitest.
Bundle: **UMD ~26 KB gz** including Preact + socket.io-client.

## Integration

```html
<div id="lmt"></div>
<script src="https://cdn.example.com/lmt.umd.js"></script>
<script>
  const lmt = LMT.create({
    container: '#lmt',
    partner: 'demo-feedh',                    // required, used in verify_client
    endpoint: 'https://websocket.endpoint/',  // optional, defaults to the PDF value
    theme: {
      brandName: 'Goal99',
      primaryColor: '#10b981',
      accentColor: '#facc15',
    },
  });

  lmt.loadEvent('123456');
  lmt.on('action', (a) => console.log(a));
  lmt.setTheme({ primaryColor: '#dc2626' });   // live recolour
  // lmt.destroy();
</script>
```

The host site provides its own navigation/header — the LMT renders only:
score header → 5 tabs → SVG pitch (sport-aware) → status footer.

## Public API

| Method | Description |
|---|---|
| `LMT.create(config)` | Creates a tracker instance. Validates `partner` and `container`. |
| `lmt.loadEvent(id \| ids[])` | Load or switch event. Reuses the verified session. |
| `lmt.on(event, cb)` | Subscribe. Returns an unsubscribe fn. |
| `lmt.off(event, cb)` | Unsubscribe. |
| `lmt.setTheme(theme)` | Patch the live theme (CSS vars update in-place). |
| `lmt.getState()` | Snapshot `{ event, lastAction, timeline }`. |
| `lmt.destroy()` | Disconnects socket and tears down the UI. |

Events emitted by the instance: `ready`, `event:loaded`, `event:updated`,
`action`, `connection`, `error`.

## Development

```bash
npm install
npm run dev            # Vite dev server at http://localhost:5173
                       #   /examples/playground.html  → quick single panel
                       #   /examples/dashboard.html   → full dev dashboard
npm run mock           # mock Socket.IO server on ws://localhost:4545
npm test               # 45 unit tests (Vitest + jsdom)
npm run lint
npm run typecheck
npm run build          # dist/lmt.{esm,cjs,umd}.js
```

### See the tracker live, with no real backend

Open **two terminals**:

```bash
# Terminal 1 — mock Socket.IO server (streams a simulated soccer match)
npm run mock

# Terminal 2 — Vite dev server with HMR
npm run dev
```

Then open `http://localhost:5173/examples/dashboard.html`. The dashboard
lets you switch between the **mock server** (auto-streaming match) and an
**in-page fake socket** (manual buttons that trigger any of the 33 soccer
actions: GOAL, corner, yellow card, halftime, VAR…). Brand presets
(default, Goal99, Crimson, Ocean, Amber) recolour the LMT live via
`setTheme`.

## File layout

```
src/
  core/        socket, controller, store, types, event bus
  ui/          Shadow DOM shell, score header, tab bar, footer, tabs
  sports/      registry + per-sport stages (soccer today, others next)
tools/mock-ws/ local Socket.IO server reproducing the provider workflow
examples/      playground.html (basic) and dashboard.html (full)
tests/         45 Vitest tests (controller, store, UI, soccer, tabs, …)
```
