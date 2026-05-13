import type { TabKey } from '../core/store';

export interface TabDef {
  key: TabKey;
  label: string;
}

export const DEFAULT_TABS: TabDef[] = [
  { key: 'stats', label: 'Stats' },
  { key: 'player-stats', label: 'Player Stats' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'lineups', label: 'Lineups' },
  { key: 'table', label: 'Table' },
];

interface Props {
  active: TabKey;
  onChange: (key: TabKey) => void;
  tabs?: TabDef[];
}

export function TabBar({ active, onChange, tabs = DEFAULT_TABS }: Props) {
  return (
    <div class="lmt-tabs" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.key}
          class="lmt-tab"
          role="tab"
          type="button"
          aria-selected={active === t.key}
          data-tab={t.key}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
