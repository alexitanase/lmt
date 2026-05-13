import type { ActionModel, EventModel, ThemeConfig } from '../core/types';
import { getSportStage } from '../sports/registry';

interface Props {
  event: EventModel | null;
  lastAction: ActionModel | null;
  theme: ThemeConfig;
}

export function PitchStage({ event, lastAction, theme }: Props) {
  if (!event) {
    return (
      <div class="lmt-pitch">
        <div class="lmt-pitch__placeholder">Esperando evento…</div>
      </div>
    );
  }
  const Stage = getSportStage(event.si);
  if (!Stage) {
    return (
      <div class="lmt-pitch">
        <div class="lmt-pitch__placeholder">
          Deporte #{event.si} ({event.sn ?? '?'}) — pendiente de
          implementación.
        </div>
      </div>
    );
  }
  return (
    <div class="lmt-pitch">
      <Stage event={event} lastAction={lastAction} theme={theme} />
    </div>
  );
}
