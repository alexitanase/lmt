# LMT — Live Match Tracker

Embeddable JavaScript library that renders a live match tracker in a
`<div>` of the host site. SVG-based stage per sport, fed by the provider
WebSocket (Socket.IO 4.x) documented in the project PDF. Configurable per
white-label brand at instantiation.

**Status:** 0.1.0 — first public release. 11 sports, 5 populated tabs,
Shadow-DOM theming, mock server, dashboard, 77 tests.

## Install

```bash
npm install @lmt/tracker
```

Or use directly from a CDN:

```html
<script src="https://unpkg.com/@lmt/tracker/dist/lmt.min.js"></script>
```

A self-contained example is in `examples/basic.html`.

## Quick start

```html
<div id="lmt"></div>
<script src="https://unpkg.com/@lmt/tracker/dist/lmt.min.js"></script>
<script>
  const lmt = LMT.create({
    container: '#lmt',
    partner: 'demo-feedh',                    // verify_client.Partner
    endpoint: 'https://websocket.endpoint/',  // optional; default from PDF
    theme: {
      brandName: 'Goal99',
      primaryColor: '#10b981',
      accentColor: '#facc15',
    },
  });

  lmt.loadEvent('123456');
  lmt.on('action', (a) => console.log(a));
  lmt.setTheme({ primaryColor: '#dc2626' });  // live recolour
  // lmt.destroy();
</script>
```

ESM:

```ts
import { LMT, type LMTConfig, type ActionModel } from '@lmt/tracker';

const lmt = LMT.create({ container: '#lmt', partner: 'demo-feedh' });
lmt.on('action', (action: ActionModel) => render(action));
```

The host site owns its own navigation/header — the LMT renders only:
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

Events emitted by the instance:
`ready`, `event:loaded`, `event:updated`, `action`, `connection`, `error`.

### Theme tokens

The values you pass to `theme` are applied as CSS custom properties on
the LMT root (inside the Shadow DOM):

| Theme key | CSS variable |
|---|---|
| `bgColor` | `--lmt-bg` |
| `primaryColor` | `--lmt-primary` |
| `accentColor` | `--lmt-accent` |
| `homeColor` | `--lmt-home` |
| `awayColor` | `--lmt-away` |
| `font` | `--lmt-font` |
| `brandName` | used for `aria-label` (not displayed; host owns the chrome) |

## Supported sports

All 11 sport IDs documented as stable in the provider PDF:

| Sport | si | actions registered |
|---|---|---|
| Soccer | 1 | 33 (full §Actions list for soccer) |
| Ice Hockey | 2 | 16 |
| Basketball | 3 | 20 |
| Tennis | 4 | 17 |
| Baseball | 5 | 9 |
| Volleyball | 6 | 9 |
| Rugby | 7 | 10 |
| Handball | 8 | 11 |
| Table Tennis | 10 | 9 |
| American Football | 13 | 9 |
| Cricket | 66 | 8 |

Unknown actions fall through to a `silent` renderer so an unexpected
message never breaks the stream — it is still recorded in the timeline.

## Distribution

The published package ships:

| File | Purpose |
|---|---|
| `dist/lmt.esm.js` | ESM bundle (modern bundlers) |
| `dist/lmt.cjs.js` | CommonJS bundle |
| `dist/lmt.umd.js` | UMD bundle (browser global `LMT`) |
| `dist/lmt.min.js` | CDN-friendly alias of the UMD bundle |
| `dist/index.d.ts` | Rolled-up TypeScript declarations |

Bundle size: **UMD ≈ 30 KB gzipped** including Preact and
`socket.io-client`.

## Development

```bash
npm install
npm run dev            # Vite dev server on http://localhost:5173
                       #   /examples/playground.html
                       #   /examples/dashboard.html
                       #   /examples/basic.html
npm run mock           # mock Socket.IO server on ws://localhost:4545
npm test               # 77 unit tests (Vitest + jsdom)
npm run lint
npm run typecheck
npm run build          # dist/lmt.{esm,cjs,umd}.js + lmt.min.js + index.d.ts
```

### See the tracker live with no real backend

Open **two terminals**:

```bash
# Terminal 1 — mock Socket.IO server (auto-streaming match)
npm run mock

# Terminal 2 — Vite dev server with HMR
npm run dev
```

Then open <http://localhost:5173/examples/dashboard.html>. The dashboard
lets you switch between the **mock server** and an **in-page fake
socket** (manual buttons that trigger any of the registered actions),
switch sport, switch brand preset, and watch the live WS log.

## File layout

```
src/
  core/        socket client, controller, store, types, event bus
  ui/          Shadow-DOM shell, score header, tab bar, footer, tabs
  sports/      registry + per-sport stages
    shared/    BallMarker, PlayerTip, ActionBanner, projection, createStage
    soccer/    icehockey/  basketball/  tennis/  baseball/  volleyball/
    rugby/     handball/   tabletennis/ americanfootball/   cricket/
tools/mock-ws/ local Socket.IO server reproducing the provider workflow
tools/postbuild.mjs  copies dist/lmt.umd.js → dist/lmt.min.js
examples/      playground.html · dashboard.html · basic.html
tests/         77 Vitest tests
```

## Roadmap

This release closes Phases 0–6 of [`TASKS.md`](./TASKS.md). See
[`PROGRESS.md`](./PROGRESS.md) for the per-commit bitácora and
[`CHANGELOG.md`](./CHANGELOG.md) for release notes.

Planned next: optional lineups feed when the provider exposes one,
per-sport ests label maps, and accessibility audit.
