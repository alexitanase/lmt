/**
 * Cricket ground (oval) with central wicket strip.
 * viewBox 1400 × 1000. Inner pitch (wickets) is the projection area
 * inside the oval — projectBall maps 0..1 to the bounding box.
 */
export const CRICKET_AREA = { x: 100, y: 100, w: 1200, h: 800 };
export const CRICKET_VIEW = { w: 1400, h: 1000 };

export function CricketGround() {
  return (
    <g class="lmt-pitch-cricket">
      <defs>
        <radialGradient id="lmt-cricket-grass" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #15803d)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #14532d)" />
        </radialGradient>
      </defs>

      <rect width="1400" height="1000" fill="rgba(0,0,0,0.55)" />

      {/* Outer oval boundary */}
      <ellipse
        cx="700" cy="500" rx="600" ry="400"
        fill="url(#lmt-cricket-grass)"
        stroke="rgba(255,255,255,0.95)" stroke-width="3"
      />

      {/* 30-yard inner ring */}
      <ellipse cx="700" cy="500" rx="300" ry="200"
        stroke="rgba(255,255,255,0.7)" stroke-width="2"
        stroke-dasharray="8 6" fill="rgba(0,0,0,0.05)" />

      {/* Pitch (wicket strip) */}
      <rect x="640" y="425" width="120" height="150" fill="#a16207"
        stroke="rgba(255,255,255,0.9)" stroke-width="2" />

      {/* Wickets at both ends */}
      {[440, 570].map((y) => (
        <g key={y}>
          <line x1="690" y1={y} x2="690" y2={y + 14}
            stroke="#fef3c7" stroke-width="3" />
          <line x1="700" y1={y} x2="700" y2={y + 14}
            stroke="#fef3c7" stroke-width="3" />
          <line x1="710" y1={y} x2="710" y2={y + 14}
            stroke="#fef3c7" stroke-width="3" />
        </g>
      ))}
    </g>
  );
}
