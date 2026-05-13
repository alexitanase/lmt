/**
 * Base CSS for the LMT shell, injected inside the Shadow DOM so it cannot
 * leak into the host site. All colors come from CSS variables that
 * `themeVars()` overrides per instance.
 */
export const baseStyles = `
  :host, .lmt-root {
    --lmt-bg: #0f172a;
    --lmt-bg-2: #111827;
    --lmt-fg: #e5e7eb;
    --lmt-muted: #94a3b8;
    --lmt-divider: #1f2937;
    --lmt-primary: #10b981;
    --lmt-accent: #facc15;
    --lmt-pitch-1: #166534;
    --lmt-pitch-2: #14532d;
    --lmt-home: #ffffff;
    --lmt-away: #ef4444;
    --lmt-radius: 10px;
    --lmt-font:
      ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    color: var(--lmt-fg);
    font-family: var(--lmt-font);
    box-sizing: border-box;
  }
  *, *::before, *::after { box-sizing: inherit; }

  .lmt-root {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--lmt-bg);
    border-radius: var(--lmt-radius);
    overflow: hidden;
  }

  /* ── ScoreHeader ─────────────────────────────────────────────── */
  .lmt-score {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 16px 12px 6px;
    background: var(--lmt-bg);
  }
  .lmt-score__team {
    flex: 1;
    font-weight: 600;
    font-size: 15px;
    color: var(--lmt-fg);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lmt-score__score {
    display: flex;
    gap: 12px;
    font-size: 30px;
    line-height: 1;
    font-weight: 800;
    color: var(--lmt-accent);
    min-width: 80px;
    justify-content: center;
  }
  .lmt-score__bars {
    display: flex;
    gap: 4px;
    justify-content: center;
    padding-bottom: 8px;
  }
  .lmt-score__bar {
    width: 36px; height: 3px; border-radius: 2px;
  }
  .lmt-score__bar--home { background: var(--lmt-home); }
  .lmt-score__bar--away { background: var(--lmt-away); }

  /* ── TabBar ──────────────────────────────────────────────────── */
  .lmt-tabs {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    padding: 4px 8px 0;
    border-bottom: 1px solid var(--lmt-divider);
    background: var(--lmt-bg);
    scrollbar-width: none;
  }
  .lmt-tabs::-webkit-scrollbar { display: none; }
  .lmt-tab {
    appearance: none;
    background: transparent;
    border: none;
    color: var(--lmt-muted);
    font: inherit;
    font-size: 13px;
    padding: 8px 10px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
  }
  .lmt-tab:hover { color: var(--lmt-fg); }
  .lmt-tab[aria-selected="true"] {
    color: var(--lmt-fg);
    border-bottom-color: var(--lmt-accent);
  }

  /* ── Pitch placeholder ───────────────────────────────────────── */
  .lmt-pitch {
    position: relative;
    flex: 1;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 60%),
      linear-gradient(135deg, var(--lmt-pitch-1), var(--lmt-pitch-2));
  }
  .lmt-pitch__placeholder {
    color: rgba(255,255,255,0.8);
    font-size: 13px;
    padding: 24px;
    text-align: center;
  }
  .lmt-pitch__clock {
    position: absolute;
    top: 8px; left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.55);
    color: var(--lmt-primary);
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }

  /* ── StatusFooter ────────────────────────────────────────────── */
  .lmt-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-top: 1px solid var(--lmt-divider);
    background: var(--lmt-bg);
    font-size: 13px;
    min-height: 42px;
  }
  .lmt-footer__bar {
    width: 4px; height: 22px; border-radius: 2px;
    background: var(--lmt-muted);
  }
  .lmt-footer__bar--home { background: var(--lmt-home); }
  .lmt-footer__bar--away { background: var(--lmt-away); }
  .lmt-footer__text { color: var(--lmt-fg); }
  .lmt-footer__text strong { color: var(--lmt-fg); }
  .lmt-footer__conn {
    margin-left: auto;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--lmt-bg-2);
    color: var(--lmt-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .lmt-footer__conn[data-state="ready"] { color: var(--lmt-primary); }
  .lmt-footer__conn[data-state="error"],
  .lmt-footer__conn[data-state="disconnected"] { color: var(--lmt-away); }

  /* ── Generic tab content placeholders ────────────────────────── */
  .lmt-tab-content {
    padding: 14px 16px;
    color: var(--lmt-fg);
    font-size: 13px;
    max-height: 280px;
    overflow-y: auto;
  }

  /* ── Stage (SVG per-sport) ───────────────────────────────────── */
  .lmt-pitch { padding: 0; }
  .lmt-stage {
    width: 100%;
    height: auto;
    display: block;
    background: #0b1220;
  }

  .lmt-ball-anim { transition: transform 0.6s ease-out; }
  .lmt-ball-halo { fill: rgba(255,255,255,0.18); }
  .lmt-ball-halo--home { fill: var(--lmt-home); opacity: 0.45; }
  .lmt-ball-halo--away { fill: var(--lmt-away); opacity: 0.45; }

  .lmt-tip text { paint-order: stroke; }

  @keyframes lmt-banner-show {
    0%   { opacity: 0; transform: translateY(20px) scale(0.92); }
    10%  { opacity: 1; transform: translateY(0)    scale(1); }
    85%  { opacity: 1; transform: translateY(0)    scale(1); }
    100% { opacity: 0; transform: translateY(-10px) scale(1.05); }
  }
  .lmt-banner {
    transform-box: fill-box;
    transform-origin: center;
    animation: lmt-banner-show 3.6s ease both;
  }

  /* ── Stats tab ───────────────────────────────────────────────── */
  .lmt-stats { display: flex; flex-direction: column; gap: 10px; }
  .lmt-stat__row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 13px;
  }
  .lmt-stat__name { color: var(--lmt-muted); }
  .lmt-stat__val { font-weight: 700; font-variant-numeric: tabular-nums; }
  .lmt-stat__bar {
    display: flex; height: 4px; border-radius: 2px; overflow: hidden;
    margin-top: 4px; background: var(--lmt-divider);
  }
  .lmt-stat__bar-home { background: var(--lmt-home); }
  .lmt-stat__bar-away { background: var(--lmt-away); }

  /* ── Timeline tab ────────────────────────────────────────────── */
  .lmt-timeline__list {
    margin: 0; padding: 0; list-style: none;
    display: flex; flex-direction: column; gap: 6px;
  }
  .lmt-timeline__item {
    display: flex; gap: 8px; align-items: center;
    padding: 4px 8px; border-left: 3px solid var(--lmt-divider);
  }
  .lmt-timeline__item--home { border-left-color: var(--lmt-home); }
  .lmt-timeline__item--away { border-left-color: var(--lmt-away); }
  .lmt-timeline__time {
    font-family: ui-monospace, monospace;
    font-size: 11px;
    color: var(--lmt-muted);
    min-width: 42px;
  }
  .lmt-timeline__dot {
    width: 8px; height: 8px; border-radius: 999px;
    background: var(--lmt-primary);
    flex: 0 0 8px;
  }
  .lmt-timeline__player { color: var(--lmt-muted); }

  /* ── Lineups tab ─────────────────────────────────────────────── */
  .lmt-lineups { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .lmt-lineups__team { margin: 0 0 6px; color: var(--lmt-fg); font-size: 14px; }
  .lmt-lineups__hint { color: var(--lmt-muted); font-size: 12px; margin: 0; }

  /* ── Table tab ───────────────────────────────────────────────── */
  .lmt-table__dl {
    display: grid; grid-template-columns: 110px 1fr; gap: 4px 12px;
    margin: 0;
  }
  .lmt-table__dl dt { color: var(--lmt-muted); font-size: 12px; }
  .lmt-table__dl dd { margin: 0; color: var(--lmt-fg); font-size: 13px; }
  .lmt-table__hint { color: var(--lmt-muted); font-size: 12px; margin: 8px 0 0; }

  /* ── Player stats tab ────────────────────────────────────────── */
  .lmt-player-stats ul {
    margin: 0; padding: 0; list-style: none;
    display: flex; flex-direction: column; gap: 6px;
  }
  .lmt-pstat {
    display: flex; flex-direction: column; gap: 4px;
    padding: 6px 8px; border-left: 3px solid var(--lmt-divider);
  }
  .lmt-pstat--home { border-left-color: var(--lmt-home); }
  .lmt-pstat--away { border-left-color: var(--lmt-away); }
  .lmt-pstat__name { color: var(--lmt-fg); font-size: 13px; }
  .lmt-pstat__actions { display: flex; flex-wrap: wrap; gap: 4px; }
  .lmt-pstat__chip {
    font-size: 11px;
    padding: 2px 6px;
    border: 1px solid var(--lmt-divider);
    border-radius: 999px;
    color: var(--lmt-muted);
  }
`;
