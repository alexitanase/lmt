import { ActionBanner } from '../shared/ActionBanner';
import { BallMarker } from '../shared/BallMarker';
import { PlayerTip } from '../shared/PlayerTip';
import { projectBall } from '../shared/projection';
import type { SportStageProps } from '../types';
import { TENNIS_AREA, TENNIS_VIEW, TennisCourt } from './court';
import { getTennisActionMeta } from './actions';

export function TennisStage({ event, lastAction }: SportStageProps) {
  const meta = lastAction ? getTennisActionMeta(lastAction.Action) : null;
  const projected =
    meta?.kind === 'positional'
      ? projectBall(lastAction?.BallPosition, TENNIS_AREA)
      : null;
  const bannerKey =
    meta?.kind === 'banner' && lastAction
      ? `${lastAction.Action}:${lastAction.ServerTime ?? lastAction.Seconds ?? Date.now()}`
      : null;

  return (
    <svg
      class="lmt-stage lmt-stage--tennis"
      viewBox={`0 0 ${TENNIS_VIEW.w} ${TENNIS_VIEW.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Tennis match: ${event.th.name} vs ${event.ta.name}`}
    >
      <TennisCourt />

      {/* Sets badge (top right) — derived from etsc when available */}
      {event.etsc && event.etsc.length > 0 && (
        <g>
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
      )}

      {projected && lastAction && (
        <g
          class="lmt-ball-anim"
          transform={`translate(${projected.x} ${projected.y})`}
          data-action={lastAction.Action}
          data-team={lastAction.Team}
        >
          <BallMarker team={lastAction.Team} />
          {lastAction.Player && <PlayerTip name={lastAction.Player} />}
        </g>
      )}

      {bannerKey && lastAction && meta && (
        <ActionBanner
          action={lastAction}
          meta={meta}
          bannerKey={bannerKey}
          width={TENNIS_VIEW.w}
          height={TENNIS_VIEW.h}
        />
      )}
    </svg>
  );
}
