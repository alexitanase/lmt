/**
 * Baseball diamond rendered from the catcher's perspective.
 * viewBox 1200 × 1200. Home plate at the bottom; 1B right, 2B top, 3B left.
 * BallPosition projects to a generic 100..1100 × 100..1100 area.
 */
export const BASEBALL_AREA = { x: 100, y: 100, w: 1000, h: 1000 };
export const BASEBALL_VIEW = { w: 1200, h: 1200 };

export function BaseballDiamond() {
  return (
    <g class="lmt-pitch-baseball">
      <defs>
        <linearGradient id="lmt-bb-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #15803d)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #166534)" />
        </linearGradient>
        <radialGradient id="lmt-bb-dirt" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stop-color="#92400e" />
          <stop offset="65%" stop-color="#78350f" />
          <stop offset="100%" stop-color="transparent" />
        </radialGradient>
      </defs>

      <rect width="1200" height="1200" fill="rgba(0,0,0,0.55)" />

      {/* Outfield (fan-shaped grass) */}
      <path
        d="M 600 1080 L 100 580 A 720 720 0 0 1 1100 580 Z"
        fill="url(#lmt-bb-grass)"
      />

      {/* Infield dirt */}
      <circle cx="600" cy="850" r="290" fill="url(#lmt-bb-dirt)" />

      {/* Diamond connecting bases */}
      <polygon
        points="600,1060 870,790 600,520 330,790"
        stroke="rgba(255,255,255,0.95)" stroke-width="3" fill="rgba(0,0,0,0.05)"
      />

      {/* Pitcher's mound + rubber */}
      <circle cx="600" cy="790" r="44" fill="#92400e"
        stroke="rgba(255,255,255,0.6)" stroke-width="2" />
      <rect x="588" y="782" width="24" height="14" fill="#ffffff" />

      {/* Bases */}
      <rect x="586" y="1046" width="28" height="28" fill="#ffffff" transform="rotate(45 600 1060)" />
      <rect x="856" y="776" width="28" height="28" fill="#ffffff" transform="rotate(45 870 790)" />
      <rect x="586" y="506" width="28" height="28" fill="#ffffff" transform="rotate(45 600 520)" />
      <rect x="316" y="776" width="28" height="28" fill="#ffffff" transform="rotate(45 330 790)" />

      {/* Foul lines */}
      <line x1="600" y1="1060" x2="100" y2="560"
        stroke="rgba(255,255,255,0.85)" stroke-width="2" />
      <line x1="600" y1="1060" x2="1100" y2="560"
        stroke="rgba(255,255,255,0.85)" stroke-width="2" />
    </g>
  );
}
