import type {
  ActionModel,
  ConnectionState,
  EventModel,
} from '../core/types';

interface Props {
  event: EventModel | null;
  lastAction: ActionModel | null;
  connection: ConnectionState;
}

function teamName(event: EventModel | null, side: 'home' | 'away'): string {
  if (!event) return '—';
  return (side === 'home' ? event.th?.name : event.ta?.name) ?? '—';
}

function statusText(
  event: EventModel | null,
  lastAction: ActionModel | null,
): { text: string; side?: 'home' | 'away' } {
  if (!event) return { text: 'Esperando evento…' };
  if (!lastAction) return { text: 'En juego' };
  const side =
    lastAction.Team === 'home' || lastAction.Team === 'away'
      ? (lastAction.Team as 'home' | 'away')
      : undefined;
  if (lastAction.Action === 'possession' && side) {
    return { text: `${teamName(event, side)} · In Possession`, side };
  }
  return {
    text: `${lastAction.Action}${
      lastAction.Player ? ` · ${lastAction.Player}` : ''
    }`,
    side,
  };
}

export function StatusFooter({ event, lastAction, connection }: Props) {
  const { text, side } = statusText(event, lastAction);
  const barClass = side
    ? `lmt-footer__bar lmt-footer__bar--${side}`
    : 'lmt-footer__bar';
  return (
    <div class="lmt-footer" role="status">
      <span class={barClass} aria-hidden="true" />
      <span class="lmt-footer__text">{text}</span>
      <span class="lmt-footer__conn" data-state={connection}>
        {connection}
      </span>
    </div>
  );
}
