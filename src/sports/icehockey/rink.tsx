/**
 * Top-down ice hockey rink with rounded corners (60m × 30m, NHL-ish).
 * viewBox: 1500 × 750. Playable area inside the boards: 30..1470 × 30..720.
 */
export const ICEHOCKEY_AREA = { x: 30, y: 30, w: 1440, h: 690 };
export const ICEHOCKEY_VIEW = { w: 1500, h: 750 };

export function IceHockeyRink() {
  return (
    <g class="lmt-pitch-icehockey">
      <defs>
        <linearGradient id="lmt-ice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #cbd5e1)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #e2e8f0)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1500" height="750" fill="rgba(0,0,0,0.55)" />

      {/* Boards (rounded corners) */}
      <rect
        x="30" y="30" width="1440" height="690" rx="120" ry="120"
        fill="url(#lmt-ice)"
        stroke="#0f172a" stroke-width="3"
      />

      {/* Center red line + circles */}
      <line x1="750" y1="30" x2="750" y2="720" stroke="#dc2626" stroke-width="3" />
      <circle cx="750" cy="375" r="80" stroke="#1e40af" stroke-width="2" fill="none" />
      <circle cx="750" cy="375" r="6" fill="#1e40af" />

      {/* Two blue lines */}
      <line x1="540" y1="30" x2="540" y2="720" stroke="#1d4ed8" stroke-width="3" />
      <line x1="960" y1="30" x2="960" y2="720" stroke="#1d4ed8" stroke-width="3" />

      {/* Goal lines (red) */}
      <line x1="120" y1="100" x2="120" y2="650" stroke="#dc2626" stroke-width="2" />
      <line x1="1380" y1="100" x2="1380" y2="650" stroke="#dc2626" stroke-width="2" />

      {/* Goal creases */}
      <path d="M 120 345 A 36 36 0 0 1 120 405" stroke="#1d4ed8"
        stroke-width="2" fill="rgba(29,78,216,0.18)" />
      <path d="M 1380 345 A 36 36 0 0 0 1380 405" stroke="#1d4ed8"
        stroke-width="2" fill="rgba(29,78,216,0.18)" />

      {/* Goal frames (outside crease) */}
      <rect x="105" y="350" width="15" height="50" stroke="#dc2626"
        stroke-width="2" fill="rgba(220,38,38,0.15)" />
      <rect x="1380" y="350" width="15" height="50" stroke="#dc2626"
        stroke-width="2" fill="rgba(220,38,38,0.15)" />

      {/* 4 zone face-off circles */}
      {[
        [330, 220],
        [330, 530],
        [1170, 220],
        [1170, 530],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="50" stroke="#dc2626" stroke-width="2" fill="none" />
          <circle cx={cx} cy={cy} r="3" fill="#dc2626" />
        </g>
      ))}

      {/* Center face-off spot */}
      <circle cx="750" cy="375" r="3" fill="#dc2626" />
    </g>
  );
}
