import type { ComponentType } from 'preact';
import type { ActionModel, EventModel } from '../../core/types';
import type { SportStage, SportStageProps } from '../types';
import type { ActionMeta } from '../soccer/actions';
import { ActionBanner } from './ActionBanner';
import { BallMarker } from './BallMarker';
import { PlayerTip } from './PlayerTip';
import { projectBall, type PitchArea } from './projection';

export interface OverlayProps {
  event: EventModel;
  lastAction: ActionModel | null;
}

interface StageOptions {
  className: string;
  view: { w: number; h: number };
  area: PitchArea;
  Pitch: ComponentType;
  getMeta: (action: string) => ActionMeta;
  /** Optional sport-specific overlays (e.g., clock badge, sets badge). */
  Overlays?: ComponentType<OverlayProps>;
}

/**
 * Common stage layout for any sport: SVG with viewBox → pitch → optional
 * overlays → positional ball marker (when meta.kind === 'positional')
 * → banner overlay (when meta.kind === 'banner'). Removes ~50 lines of
 * boilerplate per sport.
 */
export function createStage(opts: StageOptions): SportStage {
  return function Stage({ event, lastAction }: SportStageProps) {
    const meta = lastAction ? opts.getMeta(lastAction.Action) : null;
    const projected =
      meta?.kind === 'positional'
        ? projectBall(lastAction?.BallPosition, opts.area)
        : null;
    const bannerKey =
      meta?.kind === 'banner' && lastAction
        ? `${lastAction.Action}:${lastAction.ServerTime ?? lastAction.Seconds ?? Date.now()}`
        : null;
    const label = `${event.sn ?? 'Match'}: ${event.th.name} vs ${event.ta.name}`;

    return (
      <svg
        class={`lmt-stage ${opts.className}`}
        viewBox={`0 0 ${opts.view.w} ${opts.view.h}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={label}
      >
        <opts.Pitch />

        {opts.Overlays && <opts.Overlays event={event} lastAction={lastAction} />}

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
            width={opts.view.w}
            height={opts.view.h}
          />
        )}
      </svg>
    );
  };
}
