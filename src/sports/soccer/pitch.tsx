/**
 * Top-down soccer pitch rendered in SVG user units.
 *
 * Coordinate system (1050 × 680 viewBox, see SoccerStage):
 *   playable area: x∈[20,1030], y∈[50,660]  → 1010 × 610
 *   left goal mouth at x≈20, right at x≈1030
 *
 * Colours are pulled from CSS variables (--lmt-pitch-1 / --lmt-pitch-2)
 * so the theme engine can recolour the grass per brand.
 */
export const SOCCER_PITCH_AREA = { x: 20, y: 50, w: 1010, h: 610 };
export const SOCCER_VIEW = { w: 1050, h: 680 };

export function SoccerPitch() {
  return (
    <g class="lmt-pitch-soccer">
      <defs>
        <linearGradient id="lmt-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2)" />
        </linearGradient>
        <pattern
          id="lmt-stripes"
          width="100"
          height="610"
          x="20"
          y="50"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100" height="610" fill="url(#lmt-grass)" />
          <rect
            x="0"
            width="50"
            height="610"
            fill="rgba(255,255,255,0.04)"
          />
        </pattern>
      </defs>

      {/* Stadium ring (dark bar at top), subtle */}
      <rect x="0" y="0" width="1050" height="50" fill="rgba(0,0,0,0.6)" />
      <rect x="0" y="660" width="1050" height="20" fill="rgba(0,0,0,0.5)" />

      {/* Field with stripes */}
      <rect
        x="20"
        y="50"
        width="1010"
        height="610"
        fill="url(#lmt-stripes)"
      />

      {/* Outer boundary */}
      <rect
        x="20"
        y="50"
        width="1010"
        height="610"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />

      {/* Halfway line + center circle + center spot */}
      <line
        x1="525"
        y1="50"
        x2="525"
        y2="660"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
      />
      <circle
        cx="525"
        cy="355"
        r="73"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />
      <circle cx="525" cy="355" r="3" fill="#ffffff" />

      {/* Left penalty + goal area */}
      <rect
        x="20"
        y="180"
        width="120"
        height="350"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />
      <rect
        x="20"
        y="265"
        width="40"
        height="180"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />
      <circle cx="100" cy="355" r="3" fill="#ffffff" />
      <path
        d="M 140 305 A 50 50 0 0 1 140 405"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />

      {/* Right penalty + goal area */}
      <rect
        x="910"
        y="180"
        width="120"
        height="350"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />
      <rect
        x="990"
        y="265"
        width="40"
        height="180"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />
      <circle cx="950" cy="355" r="3" fill="#ffffff" />
      <path
        d="M 910 305 A 50 50 0 0 0 910 405"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />

      {/* Goal frames (outside the pitch) */}
      <rect
        x="10"
        y="325"
        width="10"
        height="60"
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
      />
      <rect
        x="1030"
        y="325"
        width="10"
        height="60"
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
      />

      {/* Corner arcs */}
      <path
        d="M 20 60 A 10 10 0 0 0 30 50"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />
      <path
        d="M 20 650 A 10 10 0 0 1 30 660"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />
      <path
        d="M 1020 50 A 10 10 0 0 0 1030 60"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />
      <path
        d="M 1020 660 A 10 10 0 0 1 1030 650"
        stroke="rgba(255,255,255,0.9)"
        stroke-width="2"
        fill="none"
      />
    </g>
  );
}
