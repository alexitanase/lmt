import { ActionBanner } from '../shared/ActionBanner';
import { BallMarker } from '../shared/BallMarker';
import { PlayerTip } from '../shared/PlayerTip';
import { projectBall } from '../shared/projection';
import type { SportStageProps } from '../types';
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

export function SoccerStage({ event, lastAction }: SportStageProps) {
  const meta = lastAction ? getSoccerActionMeta(lastAction.Action) : null;
  const projected =
    meta?.kind === 'positional'
      ? projectBall(lastAction?.BallPosition, SOCCER_PITCH_AREA)
      : null;

  const clock = formatClock(lastAction?.Seconds);
  const bannerKey =
    meta?.kind === 'banner' && lastAction
      ? `${lastAction.Action}:${lastAction.ServerTime ?? lastAction.Seconds ?? Date.now()}`
      : null;

  return (
    <svg
      class="lmt-stage lmt-stage--soccer"
      viewBox={`0 0 ${SOCCER_VIEW.w} ${SOCCER_VIEW.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Soccer match: ${event.th.name} vs ${event.ta.name}`}
    >
      <SoccerPitch />

      {/* Clock badge */}
      {clock && (
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
      )}

      {/* Positional action marker */}
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

      {/* Banner overlay (GOAL, HALFTIME, ...) */}
      {bannerKey && lastAction && meta && (
        <ActionBanner
          action={lastAction}
          meta={meta}
          bannerKey={bannerKey}
          width={SOCCER_VIEW.w}
          height={SOCCER_VIEW.h}
        />
      )}
    </svg>
  );
}
