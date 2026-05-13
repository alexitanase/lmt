/**
 * Top-down handball court (40m × 20m).
 * viewBox 1600 × 800. Playable: 30..1570 × 30..770.
 * Each end: 6m goal area arc + 9m free-throw arc.
 */
export const HANDBALL_AREA = { x: 30, y: 30, w: 1540, h: 740 };
export const HANDBALL_VIEW = { w: 1600, h: 800 };

export function HandballCourt() {
  return (
    <g class="lmt-pitch-handball">
      <defs>
        <linearGradient id="lmt-handball-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #15803d)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #166534)" />
        </linearGradient>
      </defs>

      <rect width="1600" height="800" fill="rgba(0,0,0,0.55)" />
      <rect x="30" y="30" width="1540" height="740" fill="url(#lmt-handball-grass)" />
      <rect x="30" y="30" width="1540" height="740"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" fill="none" />

      {/* Halfway line */}
      <line x1="800" y1="30" x2="800" y2="770"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />

      {/* Left 6m goal area + 9m free-throw arc (goal at x=30, y=400) */}
      <path d="M 30 220 A 230 230 0 0 1 30 580"
        stroke="rgba(255,255,255,0.95)" stroke-width="2"
        fill="rgba(255,255,255,0.1)" />
      <path d="M 30 130 A 320 320 0 0 1 30 670"
        stroke="rgba(255,255,255,0.75)" stroke-width="2"
        stroke-dasharray="8 6" fill="none" />

      {/* Right side mirror (goal at x=1570, y=400) */}
      <path d="M 1570 220 A 230 230 0 0 0 1570 580"
        stroke="rgba(255,255,255,0.95)" stroke-width="2"
        fill="rgba(255,255,255,0.1)" />
      <path d="M 1570 130 A 320 320 0 0 0 1570 670"
        stroke="rgba(255,255,255,0.75)" stroke-width="2"
        stroke-dasharray="8 6" fill="none" />

      {/* Goals */}
      <rect x="22" y="380" width="8" height="40"
        fill="rgba(255,255,255,0.2)"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />
      <rect x="1570" y="380" width="8" height="40"
        fill="rgba(255,255,255,0.2)"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />
    </g>
  );
}
