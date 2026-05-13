import type { ActionModel } from '../../core/types';
import { getSoccerActionMeta } from '../../sports/soccer/actions';

interface Props {
  timeline: ActionModel[];
}

function formatClock(seconds: number | undefined): string {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0)
    return '--:--';
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

export function TimelineTab({ timeline }: Props) {
  if (timeline.length === 0) {
    return (
      <div class="lmt-tab-content lmt-timeline">
        Sin acciones registradas todavía.
      </div>
    );
  }
  const items = [...timeline].reverse();
  return (
    <div class="lmt-tab-content lmt-timeline">
      <ol class="lmt-timeline__list">
        {items.map((a, i) => {
          const meta = getSoccerActionMeta(a.Action);
          const isHome = a.Team === 'home';
          const isAway = a.Team === 'away';
          return (
            <li
              class={`lmt-timeline__item ${
                isHome
                  ? 'lmt-timeline__item--home'
                  : isAway
                    ? 'lmt-timeline__item--away'
                    : ''
              }`}
              key={`${a.Action}-${a.ServerTime ?? a.Seconds ?? i}`}
            >
              <span class="lmt-timeline__time">{formatClock(a.Seconds)}</span>
              <span
                class="lmt-timeline__dot"
                style={meta.color ? `background:${meta.color}` : undefined}
              />
              <span class="lmt-timeline__label">
                {meta.short ?? meta.label}
              </span>
              {a.Player && (
                <span class="lmt-timeline__player"> · {a.Player}</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
