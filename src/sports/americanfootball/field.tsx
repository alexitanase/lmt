/**
 * American Football field (100 yards + 2× 10-yard end zones = 120 yards).
 * viewBox 1600 × 700. Playable: 100..1500 × 50..650.
 * Yard lines every ~116.67 px (10 yards).
 */
export const AMERICANFOOTBALL_AREA = { x: 100, y: 50, w: 1400, h: 600 };
export const AMERICANFOOTBALL_VIEW = { w: 1600, h: 700 };

const YARD_PX = 1400 / 12; // 12 segments of 10 yards = 120 yards total

export function AmericanFootballField() {
  return (
    <g class="lmt-pitch-americanfootball">
      <defs>
        <linearGradient id="lmt-af-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #15803d)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #166534)" />
        </linearGradient>
      </defs>

      <rect width="1600" height="700" fill="rgba(0,0,0,0.55)" />
      <rect x="100" y="50" width="1400" height="600" fill="url(#lmt-af-grass)" />

      {/* End zones tinted (10 yards each) */}
      <rect x="100" y="50" width={YARD_PX} height="600" fill="rgba(220,38,38,0.22)" />
      <rect x={100 + 11 * YARD_PX} y="50" width={YARD_PX} height="600"
        fill="rgba(220,38,38,0.22)" />

      <rect x="100" y="50" width="1400" height="600"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" fill="none" />

      {/* Yard lines (10 yards apart) */}
      {Array.from({ length: 11 }).map((_, i) => {
        const x = 100 + (i + 1) * YARD_PX;
        return (
          <line
            key={i}
            x1={x} y1="50" x2={x} y2="650"
            stroke="rgba(255,255,255,0.7)" stroke-width="1.5"
          />
        );
      })}

      {/* Midfield 50-yard line (emphasised) */}
      <line x1={100 + 6 * YARD_PX} y1="50" x2={100 + 6 * YARD_PX} y2="650"
        stroke="rgba(255,255,255,0.95)" stroke-width="2.5" />

      {/* Goal lines */}
      <line x1={100 + YARD_PX} y1="50" x2={100 + YARD_PX} y2="650"
        stroke="#fef08a" stroke-width="2" />
      <line x1={100 + 11 * YARD_PX} y1="50" x2={100 + 11 * YARD_PX} y2="650"
        stroke="#fef08a" stroke-width="2" />
    </g>
  );
}
