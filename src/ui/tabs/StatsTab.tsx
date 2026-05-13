import type { EventModel } from '../../core/types';

interface Props {
  event: EventModel | null;
}

/**
 * Soccer stats labels per `ests` keys from the EVENT_MODEL doc.
 * Unknown keys are humanised (CORNER → Corner) instead of dropped.
 */
const LABELS: Record<string, string> = {
  CORNER: 'Corners',
  YELLOW_CARD: 'Yellow Cards',
  RED_CARD: 'Red Cards',
  PENALTY: 'Penalties',
  SUBSTITUTIONS: 'Substitutions',
  SHOT_ON_TARGET: 'Shots on Target',
  SHOT_OFF_TARGET: 'Shots off Target',
  ATTACKS: 'Attacks',
  DANGER_ATTACKS: 'Dangerous Attacks',
  FREE_KICKS: 'Free Kicks',
  POSSESSION: 'Possession %',
  GOALS_HIGH_NUMS: 'Goals',
  FAULTS: 'Fouls',
  REAMING_DEAD_TIMES: 'Time-outs',
};

function humanise(key: string): string {
  if (LABELS[key]) return LABELS[key];
  return key
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toNum(v: string | number | undefined): number {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const n = Number(v.replace('%', ''));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export function StatsTab({ event }: Props) {
  const ests = event?.ests;
  if (!ests || Object.keys(ests).length === 0) {
    return (
      <div class="lmt-tab-content lmt-stats">
        Esperando estadísticas del proveedor…
      </div>
    );
  }

  return (
    <div class="lmt-tab-content lmt-stats">
      {Object.entries(ests).map(([key, stat]) => {
        if (!stat) return null;
        const h = toNum(stat.home);
        const a = toNum(stat.away);
        const total = h + a || 1;
        const homePct = (h / total) * 100;
        return (
          <div class="lmt-stat" key={key}>
            <div class="lmt-stat__row">
              <span class="lmt-stat__val">{stat.home}</span>
              <span class="lmt-stat__name">{humanise(stat.name ?? key)}</span>
              <span class="lmt-stat__val">{stat.away}</span>
            </div>
            <div class="lmt-stat__bar" aria-hidden="true">
              <span
                class="lmt-stat__bar-home"
                style={`width:${homePct}%`}
              />
              <span
                class="lmt-stat__bar-away"
                style={`width:${100 - homePct}%`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
