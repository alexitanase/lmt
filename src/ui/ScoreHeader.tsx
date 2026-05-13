import type { EventModel } from '../core/types';

interface Props {
  event: EventModel | null;
}

function parseScore(esc: string | undefined): [string, string] {
  if (!esc) return ['0', '0'];
  const [h = '0', a = '0'] = esc.split(':').map((s) => s.trim());
  return [h, a];
}

export function ScoreHeader({ event }: Props) {
  const homeName = event?.th?.name ?? '—';
  const awayName = event?.ta?.name ?? '—';
  const [homeScore, awayScore] = parseScore(event?.esc);

  return (
    <>
      <div class="lmt-score">
        <div class="lmt-score__team" title={homeName}>
          {homeName}
        </div>
        <div class="lmt-score__score">
          <span>{homeScore}</span>
          <span>{awayScore}</span>
        </div>
        <div class="lmt-score__team" title={awayName}>
          {awayName}
        </div>
      </div>
      <div class="lmt-score__bars" aria-hidden="true">
        <span class="lmt-score__bar lmt-score__bar--home" />
        <span class="lmt-score__bar lmt-score__bar--away" />
      </div>
    </>
  );
}
