import { ActionBanner } from '../shared/ActionBanner';
import { BallMarker } from '../shared/BallMarker';
import { PlayerTip } from '../shared/PlayerTip';
import { projectBall } from '../shared/projection';
import type { SportStageProps } from '../types';
import { ICEHOCKEY_AREA, ICEHOCKEY_VIEW, IceHockeyRink } from './rink';
import { getIceHockeyActionMeta } from './actions';

export function IceHockeyStage({ event, lastAction }: SportStageProps) {
  const meta = lastAction ? getIceHockeyActionMeta(lastAction.Action) : null;
  const projected =
    meta?.kind === 'positional'
      ? projectBall(lastAction?.BallPosition, ICEHOCKEY_AREA)
      : null;
  const bannerKey =
    meta?.kind === 'banner' && lastAction
      ? `${lastAction.Action}:${lastAction.ServerTime ?? lastAction.Seconds ?? Date.now()}`
      : null;

  return (
    <svg
      class="lmt-stage lmt-stage--icehockey"
      viewBox={`0 0 ${ICEHOCKEY_VIEW.w} ${ICEHOCKEY_VIEW.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Ice Hockey match: ${event.th.name} vs ${event.ta.name}`}
    >
      <IceHockeyRink />

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
          width={ICEHOCKEY_VIEW.w}
          height={ICEHOCKEY_VIEW.h}
        />
      )}
    </svg>
  );
}
