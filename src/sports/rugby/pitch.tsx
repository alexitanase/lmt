/**
 * Top-down rugby pitch (100m playing area + 2× ~10m in-goal areas).
 * viewBox 1500 × 800. Playable: 60..1440 × 60..740.
 * Try lines at x=180 and x=1320; halfway at x=750; 22m at x=408 and x=1092.
 */
export const RUGBY_AREA = { x: 60, y: 60, w: 1380, h: 680 };
export const RUGBY_VIEW = { w: 1500, h: 800 };

export function RugbyPitch() {
  return (
    <g class="lmt-pitch-rugby">
      <defs>
        <linearGradient id="lmt-rugby-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #15803d)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #166534)" />
        </linearGradient>
      </defs>

      <rect width="1500" height="800" fill="rgba(0,0,0,0.55)" />
      <rect x="60" y="60" width="1380" height="680" fill="url(#lmt-rugby-grass)" />
      <rect x="60" y="60" width="1380" height="680"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" fill="none" />

      {/* In-goal areas (try zones) tinted */}
      <rect x="60" y="60" width="120" height="680" fill="rgba(255,255,255,0.06)" />
      <rect x="1320" y="60" width="120" height="680" fill="rgba(255,255,255,0.06)" />

      {/* Try lines */}
      <line x1="180" y1="60" x2="180" y2="740"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />
      <line x1="1320" y1="60" x2="1320" y2="740"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />

      {/* Halfway line */}
      <line x1="750" y1="60" x2="750" y2="740"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" stroke-dasharray="8 6" />

      {/* 22m lines */}
      <line x1="408" y1="60" x2="408" y2="740"
        stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-dasharray="8 6" />
      <line x1="1092" y1="60" x2="1092" y2="740"
        stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-dasharray="8 6" />

      {/* Goal posts (H-shape, simplified) */}
      <line x1="180" y1="340" x2="180" y2="460" stroke="#facc15" stroke-width="3" />
      <line x1="160" y1="370" x2="200" y2="370" stroke="#facc15" stroke-width="3" />
      <line x1="1320" y1="340" x2="1320" y2="460" stroke="#facc15" stroke-width="3" />
      <line x1="1300" y1="370" x2="1340" y2="370" stroke="#facc15" stroke-width="3" />
    </g>
  );
}
