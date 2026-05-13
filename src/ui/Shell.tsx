import type { Store, LMTState, TabKey } from '../core/store';
import { VERSION } from '../core/version';
import { PitchStage } from './PitchStage';
import { ScoreHeader } from './ScoreHeader';
import { StatusFooter } from './StatusFooter';
import { TabBar } from './TabBar';
import { LineupsTab } from './tabs/LineupsTab';
import { PlayerStatsTab } from './tabs/PlayerStatsTab';
import { StatsTab } from './tabs/StatsTab';
import { TableTab } from './tabs/TableTab';
import { TimelineTab } from './tabs/TimelineTab';
import { themeVars } from './theme';

interface Props {
  state: LMTState;
  store: Store;
}

function TabContent({ state }: { state: LMTState }) {
  switch (state.activeTab) {
    case 'stats':
      return <StatsTab event={state.event} />;
    case 'player-stats':
      return <PlayerStatsTab timeline={state.timeline} />;
    case 'timeline':
      return <TimelineTab timeline={state.timeline} />;
    case 'lineups':
      return <LineupsTab event={state.event} />;
    case 'table':
      return <TableTab event={state.event} />;
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
      <PitchStage
        event={state.event}
        lastAction={state.lastAction}
        theme={state.theme}
      />
      <TabContent state={state} />
      <StatusFooter
        event={state.event}
        lastAction={state.lastAction}
        connection={state.connection}
      />
    </div>
  );
}
