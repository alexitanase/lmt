import { EventBus } from './events';
import { SocketClient, defaultSocketFactory } from './socket';
import { Store } from './store';
import {
  DEFAULT_ENDPOINT,
  type ActionModel,
  type ConnectionState,
  type EventModel,
  type LMTConfig,
  type LMTPublicEvents,
} from './types';

/**
 * Orchestrates the workflow described in the provider doc:
 *
 *   connect
 *     └─ emit verify_client { Partner }
 *          └─ on 'verified' { message: 'ok' }
 *               └─ emit client_ready { EventId }
 *                    ├─ on 'constructor'   → initial render
 *                    ├─ on 'event_details' → refresh
 *                    └─ on 'update_event'  → animate action
 */
export class Controller {
  readonly bus = new EventBus<LMTPublicEvents>();
  readonly store: Store;
  readonly socket: SocketClient;

  private readonly partner: string;
  private currentEventId: string | string[] | null = null;
  private verified = false;

  constructor(config: LMTConfig) {
    if (!config.partner) throw new Error('LMT: "partner" is required');
    this.partner = config.partner;
    this.store = new Store({
      partner: config.partner,
      theme: config.theme,
    });
    this.socket = new SocketClient(
      config.endpoint ?? DEFAULT_ENDPOINT,
      config.socketFactory ?? defaultSocketFactory,
    );
    this.bindSocket();
  }

  loadEvent(eventId: string | string[]): void {
    this.currentEventId = eventId;
    if (this.verified) {
      this.emitClientReady();
    } else {
      this.start();
    }
  }

  start(): void {
    if (this.store.getState().connection === 'idle') {
      this.setConnection('connecting');
    }
    this.socket.connect();
  }

  destroy(): void {
    this.socket.disconnect();
    this.bus.clear();
    this.store.clear();
    this.verified = false;
  }

  // ── private ─────────────────────────────────────────────────────────────

  private bindSocket(): void {
    this.socket.on('connect', () => {
      this.setConnection('connected');
      this.setConnection('verifying');
      this.socket.verifyClient(this.partner);
    });

    this.socket.on('disconnect', (...args: unknown[]) => {
      this.verified = false;
      const reason = typeof args[0] === 'string' ? args[0] : undefined;
      this.setConnection('disconnected', reason);
    });

    this.socket.on('connect_error', (...args: unknown[]) => {
      const err = args[0] as { message?: string } | undefined;
      const message = err?.message ?? 'connect_error';
      this.bus.emit('error', { message, cause: err });
      this.setConnection('error', message);
    });

    this.socket.on('verified', (...args: unknown[]) => {
      const data = args[0] as { message?: string } | undefined;
      if (data?.message === 'ok') {
        this.verified = true;
        this.setConnection('verified');
        if (this.currentEventId !== null) this.emitClientReady();
      } else {
        this.bus.emit('error', { message: 'LMT: verification failed' });
      }
    });

    this.socket.on('constructor', (...args: unknown[]) => {
      const payload = args[0] as { message?: EventModel } | undefined;
      if (!payload?.message) return;
      this.setConnection('ready');
      this.store.setState({ event: payload.message });
      this.bus.emit('event:loaded', payload.message);
      this.bus.emit('ready', { eventId: this.currentEventId ?? '' });
    });

    this.socket.on('event_details', (...args: unknown[]) => {
      const payload = args[0] as { message?: EventModel } | undefined;
      if (!payload?.message) return;
      this.store.setState({ event: payload.message });
      this.bus.emit('event:updated', payload.message);
    });

    this.socket.on('update_event', (...args: unknown[]) => {
      const payload = args[0] as { message?: ActionModel } | undefined;
      if (!payload?.message) return;
      this.store.applyAction(payload.message);
      this.bus.emit('action', payload.message);
    });
  }

  private emitClientReady(): void {
    if (this.currentEventId === null) return;
    this.socket.clientReady(this.currentEventId);
  }

  private setConnection(state: ConnectionState, reason?: string): void {
    this.store.setState({ connection: state });
    this.bus.emit('connection', { state, reason });
  }
}
