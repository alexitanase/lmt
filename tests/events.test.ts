import { describe, expect, it, vi } from 'vitest';
import { EventBus } from '../src/core/events';

interface Events {
  hello: { name: string };
  count: number;
}

describe('EventBus', () => {
  it('emits to subscribed listeners only', () => {
    const bus = new EventBus<Events>();
    const a = vi.fn();
    const b = vi.fn();
    bus.on('hello', a);
    bus.on('count', b);
    bus.emit('hello', { name: 'x' });
    expect(a).toHaveBeenCalledWith({ name: 'x' });
    expect(b).not.toHaveBeenCalled();
  });

  it('returns an unsubscribe function from on()', () => {
    const bus = new EventBus<Events>();
    const fn = vi.fn();
    const off = bus.on('count', fn);
    off();
    bus.emit('count', 42);
    expect(fn).not.toHaveBeenCalled();
  });

  it('clear() removes all listeners', () => {
    const bus = new EventBus<Events>();
    const fn = vi.fn();
    bus.on('count', fn);
    bus.clear();
    bus.emit('count', 1);
    expect(fn).not.toHaveBeenCalled();
  });
});
