import type {
  ActionModel,
  ConnectionState,
  EventModel,
  ThemeConfig,
} from './types';

export type TabKey =
  | 'stats'
  | 'player-stats'
  | 'timeline'
  | 'lineups'
  | 'table';

export interface LMTState {
  connection: ConnectionState;
  partner: string;
  theme: ThemeConfig;
  event: EventModel | null;
  lastAction: ActionModel | null;
  timeline: ActionModel[];
  activeTab: TabKey;
}

type StoreListener = (state: LMTState) => void;

const TIMELINE_LIMIT = 200;

/**
 * Reactive state container shared between controller and (future) UI.
 * Intentionally minimal — no third-party dependency.
 */
export class Store {
  private state: LMTState;
  private readonly listeners = new Set<StoreListener>();

  constructor(initial: { partner: string; theme?: ThemeConfig }) {
    this.state = {
      connection: 'idle',
      partner: initial.partner,
      theme: initial.theme ?? {},
      event: null,
      lastAction: null,
      timeline: [],
      activeTab: 'stats',
    };
  }

  getState(): LMTState {
    return this.state;
  }

  setState(patch: Partial<LMTState>): void {
    this.state = { ...this.state, ...patch };
    this.notify();
  }

  patchTheme(theme: ThemeConfig): void {
    this.state = { ...this.state, theme: { ...this.state.theme, ...theme } };
    this.notify();
  }

  applyAction(action: ActionModel): void {
    const nextEvent = action.Details ?? this.state.event;
    const nextTimeline = this.state.timeline.concat(action);
    if (nextTimeline.length > TIMELINE_LIMIT) {
      nextTimeline.splice(0, nextTimeline.length - TIMELINE_LIMIT);
    }
    this.state = {
      ...this.state,
      event: nextEvent,
      lastAction: action,
      timeline: nextTimeline,
    };
    this.notify();
  }

  subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  clear(): void {
    this.listeners.clear();
  }

  private notify(): void {
    for (const l of this.listeners) l(this.state);
  }
}
