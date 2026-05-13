import type { EventModel } from '../../core/types';

interface Props {
  event: EventModel | null;
}

/**
 * The provider doc does not (yet) include lineup data in EVENT_MODEL.
 * This tab shows team identities and is ready to render an XI when the
 * provider exposes it.
 */
export function LineupsTab({ event }: Props) {
  if (!event) {
    return <div class="lmt-tab-content">Esperando evento…</div>;
  }
  return (
    <div class="lmt-tab-content lmt-lineups">
      <div class="lmt-lineups__col">
        <h4 class="lmt-lineups__team">{event.th.name}</h4>
        <p class="lmt-lineups__hint">
          Lineup no disponible en el feed actual.
        </p>
      </div>
      <div class="lmt-lineups__col">
        <h4 class="lmt-lineups__team">{event.ta.name}</h4>
        <p class="lmt-lineups__hint">
          Lineup no disponible en el feed actual.
        </p>
      </div>
    </div>
  );
}
