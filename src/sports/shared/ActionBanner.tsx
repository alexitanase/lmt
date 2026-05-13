import type { ActionModel } from '../../core/types';
import type { ActionMeta } from '../soccer/actions';

interface Props {
  action: ActionModel;
  meta: ActionMeta;
  /** Unique key per action instance — restarts the CSS animation. */
  bannerKey: string;
  width: number;
  height: number;
}

/**
 * Full-stage banner overlay used for headline actions (GOAL, HALF TIME,
 * RED CARD, etc.). Restarts its CSS keyframe animation whenever
 * `bannerKey` changes.
 */
export function ActionBanner({
  action,
  meta,
  bannerKey,
  width,
  height,
}: Props) {
  const cx = width / 2;
  const cy = height / 2;
  const player = action.Player;
  return (
    <g key={bannerKey} class="lmt-banner">
      <rect
        x={cx - 320}
        y={cy - 70}
        width="640"
        height="140"
        rx="14"
        fill="rgba(0,0,0,0.74)"
      />
      <text
        x={cx}
        y={cy - 4}
        text-anchor="middle"
        font-size="52"
        font-weight="900"
        fill={meta.color ?? '#facc15'}
        style="letter-spacing:2px"
      >
        {meta.label}
      </text>
      {player && (
        <text
          x={cx}
          y={cy + 42}
          text-anchor="middle"
          font-size="20"
          font-weight="700"
          fill="#e5e7eb"
        >
          {player}
        </text>
      )}
    </g>
  );
}
