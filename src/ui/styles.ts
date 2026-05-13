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
    color: var(--lmt-muted);
    font-size: 13px;
  }
`;
