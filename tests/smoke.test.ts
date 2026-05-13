import { describe, expect, it } from 'vitest';
import { LMT, VERSION } from '../src/index';
import { makeFakeSocket } from './helpers/fakeSocket';

describe('LMT public API', () => {
  it('exposes a semver-ish VERSION', () => {
    expect(typeof VERSION).toBe('string');
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    expect(LMT.VERSION).toBe(VERSION);
  });

  it('throws if partner is missing', () => {
    document.body.innerHTML = '<div id="x"></div>';
    expect(() =>
      // @ts-expect-error: testing invalid input on purpose
      LMT.create({ container: '#x' }),
    ).toThrow(/partner/);
  });

  it('throws if container does not exist', () => {
    document.body.innerHTML = '';
    expect(() =>
      LMT.create({
        container: '#missing',
        partner: 'demo',
        socketFactory: () => makeFakeSocket(),
      }),
    ).toThrow(/container/);
  });

  it('returns an instance with the documented API', () => {
    document.body.innerHTML = '<div id="lmt"></div>';
    const lmt = LMT.create({
      container: '#lmt',
      partner: 'demo-feedh',
      socketFactory: () => makeFakeSocket(),
    });
    expect(typeof lmt.loadEvent).toBe('function');
    expect(typeof lmt.on).toBe('function');
    expect(typeof lmt.off).toBe('function');
    expect(typeof lmt.setTheme).toBe('function');
    expect(typeof lmt.destroy).toBe('function');
    expect(typeof lmt.getState).toBe('function');
    expect(lmt.getState().event).toBeNull();
    lmt.destroy();
  });

  it('setTheme merges into the store theme', () => {
    document.body.innerHTML = '<div id="lmt"></div>';
    const lmt = LMT.create({
      container: '#lmt',
      partner: 'demo',
      theme: { brandName: 'Goal99' },
      socketFactory: () => makeFakeSocket(),
    });
    lmt.setTheme({ primaryColor: '#10b981' });
    // theme isn't exposed on getState() yet (UI lands in Fase 2),
    // but the call must not throw and must not crash.
    expect(() => lmt.setTheme({ accentColor: '#facc15' })).not.toThrow();
    lmt.destroy();
  });
});
