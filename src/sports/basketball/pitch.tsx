/**
 * Top-down basketball court (FIBA-ish proportions, 28m × 15m).
 * viewBox: 1400 × 750. Playable area inside borders: 30..1370 × 60..690.
 */
export const BASKETBALL_AREA = { x: 30, y: 60, w: 1340, h: 630 };
export const BASKETBALL_VIEW = { w: 1400, h: 750 };

export function BasketballCourt() {
  return (
    <g class="lmt-pitch-basketball">
      <defs>
        <linearGradient id="lmt-court-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #b45309)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #78350f)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1400" height="750" fill="rgba(0,0,0,0.5)" />
      <rect x="30" y="60" width="1340" height="630" fill="url(#lmt-court-wood)" />
      <rect
        x="30" y="60" width="1340" height="630"
        stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none"
      />

      <line x1="700" y1="60" x2="700" y2="690"
        stroke="rgba(255,255,255,0.9)" stroke-width="2" />
      <circle cx="700" cy="375" r="60"
        stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none" />
      <circle cx="700" cy="375" r="3" fill="#ffffff" />

      {/* Free-throw lanes (key) */}
      <rect x="30" y="245" width="190" height="260"
        stroke="rgba(255,255,255,0.9)" stroke-width="2"
        fill="rgba(255,255,255,0.06)" />
      <circle cx="220" cy="375" r="60"
        stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none" />
      <rect x="1180" y="245" width="190" height="260"
        stroke="rgba(255,255,255,0.9)" stroke-width="2"
        fill="rgba(255,255,255,0.06)" />
      <circle cx="1180" cy="375" r="60"
        stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none" />

      {/* Three-point arcs */}
      <path d="M 30 110 L 110 110 A 240 240 0 0 1 110 640 L 30 640"
        stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none" />
      <path d="M 1370 110 L 1290 110 A 240 240 0 0 0 1290 640 L 1370 640"
        stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none" />

      {/* Hoops + backboards */}
      <line x1="76" y1="345" x2="76" y2="405" stroke="#f97316" stroke-width="3" />
      <circle cx="92" cy="375" r="10" stroke="#f97316" stroke-width="3" fill="none" />
      <line x1="1324" y1="345" x2="1324" y2="405" stroke="#f97316" stroke-width="3" />
      <circle cx="1308" cy="375" r="10" stroke="#f97316" stroke-width="3" fill="none" />
    </g>
  );
}
