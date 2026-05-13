import type { EventModel } from '../../core/types';

interface Props {
  event: EventModel | null;
}

const STATUS: Record<number, string> = {
  0: 'Not Started',
  1: 'Live',
  2: 'Ended',
  3: 'Closed',
  4: 'Delayed',
  5: 'Interrupted',
  6: 'Postponed',
  7: 'Abandoned',
  8: 'Starting',
  9: 'Live (Low Coverage)',
};

/**
 * The doc does not include league-table data. This tab surfaces the
 * tournament / category context already present in EVENT_MODEL so the
 * pane is not empty.
 */
export function TableTab({ event }: Props) {
  if (!event) {
    return <div class="lmt-tab-content">Esperando evento…</div>;
  }
  return (
    <div class="lmt-tab-content lmt-table">
      <dl class="lmt-table__dl">
        <dt>Sport</dt>
        <dd>
          {event.sn ?? '-'} (id {event.si})
        </dd>
        <dt>Tournament</dt>
        <dd>
          {event.cgn ?? '-'} {event.cgi ? `(id ${event.cgi})` : ''}
        </dd>
        <dt>Category</dt>
        <dd>
          {event.cn ?? '-'} {event.ci ? `(id ${event.ci})` : ''}
        </dd>
        <dt>Status</dt>
        <dd>{STATUS[event.es] ?? `Unknown (${event.es})`}</dd>
        <dt>Period</dt>
        <dd>
          {event.ecp ?? '-'}
          {event.eht ? ' · halftime' : ''}
        </dd>
        <dt>Score</dt>
        <dd>{event.esc ?? '-'}</dd>
        <dt>By period</dt>
        <dd>{event.etsc?.join(', ') ?? '-'}</dd>
      </dl>
      <p class="lmt-table__hint">
        Tabla de clasificación no incluida en el feed.
      </p>
    </div>
  );
}
