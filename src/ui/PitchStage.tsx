import type { ActionModel, EventModel } from '../core/types';

interface Props {
  event: EventModel | null;
  lastAction: ActionModel | null;
}

function formatClock(seconds: number | undefined): string | null {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) {
    return null;
  }
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

/**
 * Placeholder stage. The per-sport SVG pitches land in Fase 3+.
 * For now it just reserves the area, shows the clock if available
 * and prints a hint when no event is loaded yet.
 */
export function PitchStage({ event, lastAction }: Props) {
  const clock = formatClock(lastAction?.Seconds);
  const hint = event
    ? `Pitch SVG llega en Fase 3 (${event.sn ?? 'sport'} #${event.si}).`
    : 'Cargando evento…';

  return (
    <div class="lmt-pitch" role="img" aria-label="match pitch">
      {clock && <div class="lmt-pitch__clock">{clock}</div>}
      <div class="lmt-pitch__placeholder">{hint}</div>
    </div>
  );
}
