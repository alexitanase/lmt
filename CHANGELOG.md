# Changelog

All notable changes to this project are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and the project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] — 2026-05-13

First public release. Implements the full pipeline described in the
provider WebSocket API (Real Time Websocket Data 1.2.0).

### Added

- **Public API** `LMT.create({ container, partner, theme, endpoint?, socketFactory? })`
  returning `{ loadEvent, on, off, setTheme, getState, destroy }`.
- **Socket.IO 4.x client** wrapping the documented workflow
  `verify_client → verified → client_ready → constructor →
  event_details/update_event` with listener buffering across reconnects
  and verified-session reuse on event switch.
- **Reactive store + typed event bus**: `connection`, `event`,
  `lastAction`, `timeline` (capped at 200), `activeTab`, `theme`.
- **Shadow-DOM shell** with CSS custom properties (`--lmt-bg`,
  `--lmt-primary`, `--lmt-accent`, `--lmt-pitch-1/2`, `--lmt-home`,
  `--lmt-away`, `--lmt-font`, …). `setTheme` patches in place.
- **Five tabs** populated from `EVENT_MODEL`: Stats (from `ests`),
  Player Stats (aggregated from the timeline), Timeline (reverse
  chronological), Lineups, Table (tournament/category/status).
- **11 SVG sports stages** with their action registries:
  - Soccer (33 actions, the captured reference)
  - Ice Hockey (16)
  - Basketball (20)
  - Tennis (17, with `etsc` sets badge)
  - Baseball (9)
  - Volleyball (9)
  - Rugby (10)
  - Handball (11)
  - Table Tennis (9)
  - American Football (9)
  - Cricket (8)
- **Shared sport primitives**: `BallMarker`, `PlayerTip`, `ActionBanner`
  (CSS keyframe show/hide that restarts on new banner action),
  `projectBall` (clamped [0,1] → SVG coords, supports string-encoded
  positions per the provider examples), `createStage` higher-order
  helper that composes pitch + overlays + marker + banner.
- **Dev tooling**:
  - `examples/playground.html` — single-pane HMR playground.
  - `examples/dashboard.html` — full dashboard: source switcher
    (mock-ws / in-page fake), sport selector (all 11), 14 manual
    action injectors, 5 brand presets (default, Goal99, Crimson,
    Ocean, Amber), streaming WS log.
  - `examples/basic.html` — minimal CDN integration example.
  - `tools/mock-ws/server.ts` — Socket.IO server that replays the
    full provider workflow with an auto-streaming match.
  - `tools/mock-ws/smoke-client.ts` — end-to-end verifier.

### Distribution

- ESM, CJS, UMD bundles plus `lmt.min.js` CDN alias.
  UMD ~30 KB gzipped including Preact and `socket.io-client`.
- Rolled-up TypeScript declaration entry at `dist/index.d.ts`.
- `package.json` with proper `exports`, `types`, `unpkg`,
  `jsdelivr` and `sideEffects: false`.

### Tested

- 77 unit tests across 11 files (Vitest + jsdom):
  controller workflow, socket reuse, store, event bus, projection,
  Shadow-DOM UI + tabs, every sport stage and action registry.
- Mock server verified end-to-end with the smoke client.
