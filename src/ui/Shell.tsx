import type { Store, LMTState, TabKey } from '../core/store';
import { PitchStage } from './PitchStage';
import { ScoreHeader } from './ScoreHeader';
import { StatusFooter } from './StatusFooter';
import { TabBar } from './TabBar';
import { themeVars } from './theme';
import { VERSION } from '../core/version';

interface Props {
  state: LMTState;
  store: Store;
}

function TabContent({ state }: { state: LMTState }) {
  switch (state.activeTab) {
    case 'stats':
      return (
        <div class="lmt-tab-content">
          Stats llegarán en Fase 3 (mapeo de <code>ests</code>).
        </div>
      );
    case 'player-stats':
      return (
        <div class="lmt-tab-content">Player Stats — pendiente Fase 3.</div>
      );
    case 'timeline':
      return (
        <div class="lmt-tab-content">
          {state.timeline.length === 0
            ? 'Sin acciones aún.'
            : `${state.timeline.length} acción/es registradas (UI completa en Fase 3).`}
        </div>
      );
    case 'lineups':
      return <div class="lmt-tab-content">Lineups — pendiente Fase 3.</div>;
    case 'table':
      return <div class="lmt-tab-content">Table — pendiente Fase 3.</div>;
  }
}

export function Shell({ state, store }: Props) {
  const onChange = (key: TabKey) => store.setState({ activeTab: key });

  return (
    <div
      class="lmt-root"
      data-lmt-version={VERSION}
      aria-label={state.theme.brandName ?? 'Live Match Tracker'}
      style={themeVars(state.theme) as unknown as string}
    >
      <ScoreHeader event={state.event} />
      <TabBar active={state.activeTab} onChange={onChange} />
      <PitchStage event={state.event} lastAction={state.lastAction} />
      <TabContent state={state} />
      <StatusFooter
        event={state.event}
        lastAction={state.lastAction}
        connection={state.connection}
      />
    </div>
  );
}
