import { ActionBanner } from '../shared/ActionBanner';
import { BallMarker } from '../shared/BallMarker';
import { PlayerTip } from '../shared/PlayerTip';
import { projectBall } from '../shared/projection';
import type { SportStageProps } from '../types';
import { BASKETBALL_AREA, BASKETBALL_VIEW, BasketballCourt } from './pitch';
import { getBasketballActionMeta } from './actions';

export function BasketballStage({ event, lastAction }: SportStageProps) {
  const meta = lastAction ? getBasketballActionMeta(lastAction.Action) : null;
  const projected =
    meta?.kind === 'positional'
      ? projectBall(lastAction?.BallPosition, BASKETBALL_AREA)
      : null;
  const bannerKey =
    meta?.kind === 'banner' && lastAction
      ? `${lastAction.Action}:${lastAction.ServerTime ?? lastAction.Seconds ?? Date.now()}`
      : null;

  return (
    <svg
      class="lmt-stage lmt-stage--basketball"
      viewBox={`0 0 ${BASKETBALL_VIEW.w} ${BASKETBALL_VIEW.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Basketball match: ${event.th.name} vs ${event.ta.name}`}
    >
      <BasketballCourt />

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
          width={BASKETBALL_VIEW.w}
          height={BASKETBALL_VIEW.h}
        />
      )}
    </svg>
  );
}
