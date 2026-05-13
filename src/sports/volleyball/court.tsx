/**
 * Top-down volleyball court (FIVB 18m × 9m).
 * viewBox 1800 × 900. Playable: 200..1600 × 100..800.
 * Net at x=900, attack lines at x=667 and x=1133 (3m from net each side).
 */
export const VOLLEYBALL_AREA = { x: 200, y: 100, w: 1400, h: 700 };
export const VOLLEYBALL_VIEW = { w: 1800, h: 900 };

export function VolleyballCourt() {
  return (
    <g class="lmt-pitch-volleyball">
      <defs>
        <linearGradient id="lmt-volley" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #f59e0b)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #b45309)" />
        </linearGradient>
      </defs>

      <rect width="1800" height="900" fill="rgba(0,0,0,0.55)" />
      <rect x="200" y="100" width="1400" height="700" fill="url(#lmt-volley)" />
      <rect x="200" y="100" width="1400" height="700"
        stroke="rgba(255,255,255,0.95)" stroke-width="3" fill="none" />

      {/* Net (vertical centre line + visual band) */}
      <line x1="900" y1="100" x2="900" y2="800"
        stroke="rgba(255,255,255,0.95)" stroke-width="3" />
      <line x1="900" y1="40" x2="900" y2="860"
        stroke="rgba(255,255,255,0.4)" stroke-width="10" opacity="0.4" />

      {/* Attack lines (3m from net) */}
      <line x1="667" y1="100" x2="667" y2="800"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" stroke-dasharray="8 6" />
      <line x1="1133" y1="100" x2="1133" y2="800"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" stroke-dasharray="8 6" />

      {/* Service zones tinted (outside back lines) */}
      <rect x="100" y="100" width="100" height="700" fill="rgba(0,0,0,0.18)" />
      <rect x="1600" y="100" width="100" height="700" fill="rgba(0,0,0,0.18)" />
    </g>
  );
}
