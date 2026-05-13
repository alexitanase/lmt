type Listener<T> = (data: T) => void;

/**
 * Tiny typed event emitter. Used to surface controller events to the
 * consumer (via `lmt.on(...)`) without dragging Node's EventEmitter polyfill.
 */
export class EventBus<TEvents> {
  private readonly listeners = new Map<
    keyof TEvents,
    Set<Listener<TEvents[keyof TEvents]>>
  >();

  on<K extends keyof TEvents>(
    event: K,
    listener: Listener<TEvents[K]>,
  ): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(listener as Listener<TEvents[keyof TEvents]>);
    return () => this.off(event, listener);
  }

  off<K extends keyof TEvents>(event: K, listener: Listener<TEvents[K]>): void {
    this.listeners
      .get(event)
      ?.delete(listener as Listener<TEvents[keyof TEvents]>);
  }

  emit<K extends keyof TEvents>(event: K, data: TEvents[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const l of set) (l as Listener<TEvents[K]>)(data);
  }

  clear(): void {
    this.listeners.clear();
  }
}
