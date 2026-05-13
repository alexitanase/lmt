import { io } from 'socket.io-client';
import type { SocketFactory, SocketLike } from './types';

/**
 * Default factory using socket.io-client (the provider runs Socket.IO 4.5.4).
 */
export const defaultSocketFactory: SocketFactory = (endpoint) =>
  io(endpoint, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
    autoConnect: true,
  }) as unknown as SocketLike;

/**
 * Thin wrapper around the underlying Socket.IO instance.
 * Exposes the request verbs documented in the provider spec:
 *   - verify_client       → Partner
 *   - client_ready        → EventId (single or comma-separated list)
 *   - get_events_list     → SportId
 *   - get_event_details   → EventId
 *   - get_event_h2h       → EventId
 *
 * Listener registration is buffered so listeners survive a reconnection.
 */
export class SocketClient {
  private socket: SocketLike | null = null;
  private readonly endpoint: string;
  private readonly factory: SocketFactory;
  private readonly listeners = new Map<
    string,
    Set<(...args: unknown[]) => void>
  >();

  constructor(endpoint: string, factory: SocketFactory = defaultSocketFactory) {
    this.endpoint = endpoint;
    this.factory = factory;
  }

  connect(): void {
    if (this.socket) return;
    this.socket = this.factory(this.endpoint);
    for (const [event, set] of this.listeners) {
      for (const cb of set) this.socket.on(event, cb);
    }
  }

  on(event: string, cb: (...args: unknown[]) => void): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(cb);
    if (this.socket) this.socket.on(event, cb);
    return () => this.off(event, cb);
  }

  off(event: string, cb: (...args: unknown[]) => void): void {
    this.listeners.get(event)?.delete(cb);
    if (this.socket) this.socket.off(event, cb);
  }

  emit(type: string, payload: unknown): void {
    if (!this.socket) throw new Error('LMT: socket is not connected yet');
    this.socket.emit(type, payload);
  }

  verifyClient(partner: string): void {
    this.emit('verify_client', { Partner: partner });
  }

  clientReady(eventId: string | string[]): void {
    const value = Array.isArray(eventId) ? eventId.join(', ') : eventId;
    this.emit('client_ready', { EventId: value });
  }

  getEventDetails(eventId: string | string[]): void {
    const value = Array.isArray(eventId) ? eventId.join(', ') : eventId;
    this.emit('get_event_details', { EventId: value });
  }

  getEventH2H(eventId: string | string[]): void {
    const value = Array.isArray(eventId) ? eventId.join(', ') : eventId;
    this.emit('get_event_h2h', { EventId: value });
  }

  disconnect(): void {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
  }

  get connected(): boolean {
    return Boolean(this.socket?.connected);
  }
}
