import { createStage, type OverlayProps } from '../shared/createStage';
import { SOCCER_PITCH_AREA, SOCCER_VIEW, SoccerPitch } from './pitch';
import { getSoccerActionMeta } from './actions';

function formatClock(seconds: number | undefined): string | null {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0)
    return null;
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

function SoccerOverlays({ lastAction }: OverlayProps) {
  const clock = formatClock(lastAction?.Seconds);
  if (!clock) return null;
  return (
    <g class="lmt-stage__clock">
      <rect x="475" y="6" width="100" height="34" rx="17" fill="rgba(0,0,0,0.65)" />
      <text
        x="525"
        y="29"
        text-anchor="middle"
        font-size="20"
        font-weight="700"
        fill="var(--lmt-primary)"
        font-family="ui-monospace, monospace"
      >
        {clock}
      </text>
    </g>
  );
}

export const SoccerStage = createStage({
  className: 'lmt-stage--soccer',
  view: SOCCER_VIEW,
  area: SOCCER_PITCH_AREA,
  Pitch: SoccerPitch,
  getMeta: getSoccerActionMeta,
  Overlays: SoccerOverlays,
});
