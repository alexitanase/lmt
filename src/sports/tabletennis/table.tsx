/**
 * Top-down table tennis table (2.74m × 1.525m).
 * viewBox 1500 × 800. Playable: 100..1400 × 100..700.
 * Net at x=750. Center service line at y=400.
 */
export const TABLETENNIS_AREA = { x: 100, y: 100, w: 1300, h: 600 };
export const TABLETENNIS_VIEW = { w: 1500, h: 800 };

export function TableTennisTable() {
  return (
    <g class="lmt-pitch-tabletennis">
      <defs>
        <linearGradient id="lmt-tt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #1d4ed8)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #1e3a8a)" />
        </linearGradient>
      </defs>

      <rect width="1500" height="800" fill="#0b1220" />
      <rect x="100" y="100" width="1300" height="600" fill="url(#lmt-tt)" />
      <rect x="100" y="100" width="1300" height="600"
        stroke="rgba(255,255,255,0.95)" stroke-width="4" fill="none" />

      {/* Net */}
      <line x1="750" y1="60" x2="750" y2="740"
        stroke="rgba(255,255,255,0.95)" stroke-width="3" stroke-dasharray="6 4" />
      <line x1="750" y1="100" x2="750" y2="700"
        stroke="rgba(255,255,255,0.4)" stroke-width="10" opacity="0.4" />

      {/* Center service line */}
      <line x1="100" y1="400" x2="1400" y2="400"
        stroke="rgba(255,255,255,0.75)" stroke-width="2" stroke-dasharray="4 4" />
    </g>
  );
}
