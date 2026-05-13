/**
 * Bird's-eye tennis court (doubles, 23.77m × 10.97m). The provider
 * positions the ball as [x, y] in 0..1 of the playable surface.
 *
 * viewBox: 1400 × 700. Playable area (doubles): 100..1300 × 70..630.
 */
export const TENNIS_AREA = { x: 100, y: 70, w: 1200, h: 560 };
export const TENNIS_VIEW = { w: 1400, h: 700 };

export function TennisCourt() {
  return (
    <g class="lmt-pitch-tennis">
      <defs>
        <linearGradient id="lmt-court-clay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lmt-pitch-1, #1d4ed8)" />
          <stop offset="100%" stop-color="var(--lmt-pitch-2, #1e3a8a)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1400" height="700" fill="#0b1220" />
      <rect x="40" y="20" width="1320" height="660" rx="8"
        fill="url(#lmt-court-clay)" />

      {/* Doubles outer rect */}
      <rect x="100" y="70" width="1200" height="560"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" fill="none" />

      {/* Singles sidelines */}
      <line x1="100" y1="140" x2="1300" y2="140"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />
      <line x1="100" y1="560" x2="1300" y2="560"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />

      {/* Service boxes (between service lines) */}
      <line x1="350" y1="140" x2="350" y2="560"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />
      <line x1="1050" y1="140" x2="1050" y2="560"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />
      <line x1="350" y1="350" x2="1050" y2="350"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />

      {/* Center marks on baselines */}
      <line x1="100" y1="345" x2="120" y2="345"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />
      <line x1="1280" y1="345" x2="1300" y2="345"
        stroke="rgba(255,255,255,0.95)" stroke-width="2" />

      {/* Net */}
      <line x1="700" y1="40" x2="700" y2="660"
        stroke="rgba(255,255,255,0.95)" stroke-width="3" stroke-dasharray="6 4" />
      <line x1="700" y1="40" x2="700" y2="660"
        stroke="rgba(255,255,255,0.4)" stroke-width="6" opacity="0.4" />
    </g>
  );
}
