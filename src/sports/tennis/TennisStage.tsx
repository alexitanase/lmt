import { createStage, type OverlayProps } from '../shared/createStage';
import { TENNIS_AREA, TENNIS_VIEW, TennisCourt } from './court';
import { getTennisActionMeta } from './actions';

function TennisOverlays({ event }: OverlayProps) {
  if (!event.etsc || event.etsc.length === 0) return null;
  return (
    <g class="lmt-stage__sets">
      <rect
        x={TENNIS_VIEW.w - 240}
        y="18"
        width="220"
        height="40"
        rx="20"
        fill="rgba(0,0,0,0.6)"
      />
      <text
        x={TENNIS_VIEW.w - 130}
        y="44"
        text-anchor="middle"
        font-family="ui-monospace, monospace"
        font-size="18"
        font-weight="700"
        fill="var(--lmt-accent)"
      >
        sets: {event.etsc.join(' · ')}
      </text>
    </g>
  );
}

export const TennisStage = createStage({
  className: 'lmt-stage--tennis',
  view: TENNIS_VIEW,
  area: TENNIS_AREA,
  Pitch: TennisCourt,
  getMeta: getTennisActionMeta,
  Overlays: TennisOverlays,
});
