import { describe, expect, it, vi } from 'vitest';
import { Controller } from '../src/core/controller';
import type { EventModel } from '../src/core/types';
import { makeFakeSocket } from './helpers/fakeSocket';

function sampleEvent(): EventModel {
  return {
    id: 123456,
    en: 'Guimaraes - Rio Ave',
    es: 1,
    si: 1,
    th: { id: 1, name: 'Guimaraes' },
    ta: { id: 2, name: 'Rio Ave' },
    esc: '1:0',
  };
}

describe('Controller — workflow', () => {
  it('runs verify_client → verified → client_ready → constructor → update_event', () => {
    const fake = makeFakeSocket();
    const c = new Controller({
      container: 'body',
      partner: 'demo-feedh',
      socketFactory: () => fake,
    });

    const onReady = vi.fn();
    const onLoaded = vi.fn();
    const onAction = vi.fn();
    const onConnection = vi.fn();
    c.bus.on('ready', onReady);
    c.bus.on('event:loaded', onLoaded);
    c.bus.on('action', onAction);
    c.bus.on('connection', onConnection);

    c.loadEvent('123456');

    // After "connect" → verify_client is emitted with the partner.
    fake.trigger('connect');
    expect(fake.emitted[0]).toEqual({
      type: 'verify_client',
      payload: { Partner: 'demo-feedh' },
    });

    // After "verified" → client_ready is emitted with the buffered event id.
    fake.trigger('verified', { message: 'ok' });
    expect(fake.emitted[1]).toEqual({
      type: 'client_ready',
      payload: { EventId: '123456' },
    });

    // "constructor" triggers event:loaded + ready.
    const event = sampleEvent();
    fake.trigger('constructor', { message: event });
    expect(onLoaded).toHaveBeenCalledWith(event);
    expect(onReady).toHaveBeenCalledWith({ eventId: '123456' });

    // "update_event" pushes an action into the timeline.
    fake.trigger('update_event', {
      message: { Action: 'goal', Team: 'home', Player: 'C Silva' },
    });
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(c.store.getState().timeline).toHaveLength(1);
    expect(c.store.getState().lastAction?.Action).toBe('goal');

    // Connection state transitions captured.
    const seen = onConnection.mock.calls.map((args) => args[0].state);
    expect(seen).toEqual(
      expect.arrayContaining([
        'connecting',
        'connected',
        'verifying',
        'verified',
        'ready',
      ]),
    );
  });

  it('reuses the verified session when switching event', () => {
    const fake = makeFakeSocket();
    const c = new Controller({
      container: 'body',
      partner: 'demo-feedh',
      socketFactory: () => fake,
    });
    c.loadEvent('111');
    fake.trigger('connect');
    fake.trigger('verified', { message: 'ok' });
    fake.emitted.length = 0;

    c.loadEvent('222');

    expect(fake.emitted).toEqual([
      { type: 'client_ready', payload: { EventId: '222' } },
    ]);
  });

  it('accepts multiple event ids as a comma-separated list', () => {
    const fake = makeFakeSocket();
    const c = new Controller({
      container: 'body',
      partner: 'demo-feedh',
      socketFactory: () => fake,
    });
    c.loadEvent(['1', '2', '3']);
    fake.trigger('connect');
    fake.trigger('verified', { message: 'ok' });

    const last = fake.emitted.at(-1);
    expect(last).toEqual({
      type: 'client_ready',
      payload: { EventId: '1, 2, 3' },
    });
  });

  it('emits error if "verified" returns a non-ok payload', () => {
    const fake = makeFakeSocket();
    const c = new Controller({
      container: 'body',
      partner: 'demo-feedh',
      socketFactory: () => fake,
    });
    const onError = vi.fn();
    c.bus.on('error', onError);
    c.loadEvent('1');
    fake.trigger('connect');
    fake.trigger('verified', { message: 'denied' });
    expect(onError).toHaveBeenCalled();
  });

  it('marks the session as unverified on disconnect', () => {
    const fake = makeFakeSocket();
    const c = new Controller({
      container: 'body',
      partner: 'demo-feedh',
      socketFactory: () => fake,
    });
    c.loadEvent('1');
    fake.trigger('connect');
    fake.trigger('verified', { message: 'ok' });
    fake.trigger('disconnect', 'transport close');
    expect(c.store.getState().connection).toBe('disconnected');
    // loadEvent now should retry start() instead of emitting client_ready.
    fake.emitted.length = 0;
    c.loadEvent('2');
    expect(
      fake.emitted.find((m) => m.type === 'client_ready'),
    ).toBeUndefined();
  });

  it('destroy() disconnects and clears subscriptions', () => {
    const fake = makeFakeSocket();
    const c = new Controller({
      container: 'body',
      partner: 'demo-feedh',
      socketFactory: () => fake,
    });
    const onAction = vi.fn();
    c.bus.on('action', onAction);
    c.loadEvent('1');
    fake.trigger('connect');
    c.destroy();
    fake.trigger('update_event', { message: { Action: 'goal', Team: 'home' } });
    expect(onAction).not.toHaveBeenCalled();
  });
});
