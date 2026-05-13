/**
 * LMT — Live Match Tracker.
 *
 * Public entry point. Embed in any page with:
 *
 *   const lmt = LMT.create({ container: '#lmt', partner: 'demo-feedh' });
 *   lmt.loadEvent('123456');
 *   lmt.on('action', (a) => console.log(a));
 */
import { Controller } from './core/controller';
import type {
  ActionModel,
  EventModel,
  LMTConfig,
  LMTPublicEvents,
  ThemeConfig,
} from './core/types';
import { VERSION } from './core/version';
import { mountUI } from './ui/mount';

export { VERSION };

export interface LMTInstance {
  /** Load (or switch) the event to track. Reuses the verified session. */
  loadEvent(eventId: string | string[]): void;

  /** Subscribe to a public event. Returns an unsubscribe function. */
  on<K extends keyof LMTPublicEvents>(
    event: K,
    listener: (data: LMTPublicEvents[K]) => void,
  ): () => void;

  off<K extends keyof LMTPublicEvents>(
    event: K,
    listener: (data: LMTPublicEvents[K]) => void,
  ): void;

  /** Apply a partial theme override at runtime. Updates CSS vars live. */
  setTheme(theme: ThemeConfig): void;

  /** Snapshot of the relevant state for the host. */
  getState(): {
    event: EventModel | null;
    lastAction: ActionModel | null;
    timeline: ActionModel[];
  };

  /** Tear down the socket, the UI and clear listeners. */
  destroy(): void;
}

function resolveContainer(container: string | HTMLElement): HTMLElement {
  if (typeof container !== 'string') return container;
  if (typeof document === 'undefined') {
    throw new Error('LMT: no DOM available to resolve container');
  }
  const el = document.querySelector<HTMLElement>(container);
  if (!el) throw new Error(`LMT: container "${container}" not found`);
  return el;
}

export const LMT = {
  VERSION,

  create(config: LMTConfig): LMTInstance {
    if (!config) throw new Error('LMT: config object is required');
    if (!config.partner) throw new Error('LMT: "partner" is required');
    if (!config.container) throw new Error('LMT: "container" is required');

    const containerEl =
      typeof document !== 'undefined' ? resolveContainer(config.container) : null;

    const controller = new Controller(config);

    const unmountUI = containerEl
      ? mountUI(containerEl, controller.store)
      : () => undefined;

    return {
      loadEvent(eventId) {
        controller.loadEvent(eventId);
      },
      on(event, listener) {
        return controller.bus.on(event, listener);
      },
      off(event, listener) {
        controller.bus.off(event, listener);
      },
      setTheme(next) {
        controller.store.patchTheme(next);
      },
      getState() {
        const s = controller.store.getState();
        return {
          event: s.event,
          lastAction: s.lastAction,
          timeline: s.timeline,
        };
      },
      destroy() {
        unmountUI();
        controller.destroy();
      },
    };
  },
};

export type {
  ActionModel,
  EventModel,
  LMTConfig,
  LMTPublicEvents,
  ThemeConfig,
};
