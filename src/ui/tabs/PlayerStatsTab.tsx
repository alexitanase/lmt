import type { ActionModel } from '../../core/types';
import { getSoccerActionMeta } from '../../sports/soccer/actions';

interface Props {
  timeline: ActionModel[];
}

interface PlayerEntry {
  player: string;
  team: 'home' | 'away' | 'other';
  actions: Map<string, number>;
}

function aggregate(timeline: ActionModel[]): PlayerEntry[] {
  const map = new Map<string, PlayerEntry>();
  for (const a of timeline) {
    if (!a.Player) continue;
    const key = a.Player;
    let entry = map.get(key);
    if (!entry) {
      entry = {
        player: a.Player,
        team:
          a.Team === 'home' || a.Team === 'away'
            ? (a.Team as 'home' | 'away')
            : 'other',
        actions: new Map(),
      };
      map.set(key, entry);
    }
    entry.actions.set(a.Action, (entry.actions.get(a.Action) ?? 0) + 1);
  }
  return Array.from(map.values()).sort(
    (x, y) =>
      Array.from(y.actions.values()).reduce((s, v) => s + v, 0) -
      Array.from(x.actions.values()).reduce((s, v) => s + v, 0),
  );
}

export function PlayerStatsTab({ timeline }: Props) {
  const entries = aggregate(timeline);
  if (entries.length === 0) {
    return (
      <div class="lmt-tab-content">
        Sin estadísticas individuales registradas todavía.
      </div>
    );
  }
  return (
    <div class="lmt-tab-content lmt-player-stats">
      <ul>
        {entries.map((e) => (
          <li class={`lmt-pstat lmt-pstat--${e.team}`} key={e.player}>
            <strong class="lmt-pstat__name">{e.player}</strong>
            <span class="lmt-pstat__actions">
              {Array.from(e.actions.entries()).map(([action, count]) => {
                const meta = getSoccerActionMeta(action);
                return (
                  <span
                    class="lmt-pstat__chip"
                    key={action}
                    title={meta.label}
                    style={meta.color ? `border-color:${meta.color}` : undefined}
                  >
                    {meta.short ?? meta.label} ×{count}
                  </span>
                );
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
