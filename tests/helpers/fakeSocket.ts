import type { SocketLike } from '../../src/core/types';

export interface FakeSocket extends SocketLike {
  trigger(event: string, payload?: unknown): void;
  emitted: Array<{ type: string; payload: unknown }>;
}

/**
 * Minimal Socket.IO-shaped fake used by the controller tests.
 * `trigger(event, payload)` simulates a server-side message arriving.
 * `emitted` records every client→server message.
 */
export function makeFakeSocket(): FakeSocket {
  const handlers = new Map<string, Set<(...args: unknown[]) => void>>();
  const emitted: Array<{ type: string; payload: unknown }> = [];

  const socket: FakeSocket = {
    connected: false,
    on(event, cb) {
      let set = handlers.get(event);
      if (!set) {
        set = new Set();
        handlers.set(event, set);
      }
      set.add(cb);
      return socket;
    },
    off(event, cb) {
      const set = handlers.get(event);
      if (set && cb) set.delete(cb);
      return socket;
    },
    emit(type, ...args) {
      emitted.push({ type, payload: args[0] });
      return socket;
    },
    disconnect() {
      socket.connected = false;
      const set = handlers.get('disconnect');
      if (set) for (const cb of set) cb('client disconnect');
      return socket;
    },
    trigger(event, payload) {
      if (event === 'connect') socket.connected = true;
      const set = handlers.get(event);
      if (!set) return;
      for (const cb of set) cb(payload);
    },
    emitted,
  };

  return socket;
}
