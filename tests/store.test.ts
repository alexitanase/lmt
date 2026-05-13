import { describe, expect, it } from 'vitest';
import { Store } from '../src/core/store';
import type { ActionModel } from '../src/core/types';

describe('Store', () => {
  it('starts in idle with empty event and timeline', () => {
    const s = new Store({ partner: 'demo' });
    const st = s.getState();
    expect(st.connection).toBe('idle');
    expect(st.partner).toBe('demo');
    expect(st.event).toBeNull();
    expect(st.lastAction).toBeNull();
    expect(st.timeline).toEqual([]);
  });

  it('notifies subscribers on setState', () => {
    const s = new Store({ partner: 'demo' });
    let calls = 0;
    s.subscribe(() => calls++);
    s.setState({ connection: 'connected' });
    s.setState({ connection: 'ready' });
    expect(calls).toBe(2);
    expect(s.getState().connection).toBe('ready');
  });

  it('appends actions and tracks lastAction', () => {
    const s = new Store({ partner: 'demo' });
    const a: ActionModel = { Action: 'goal', Team: 'home', Player: 'C Silva' };
    s.applyAction(a);
    expect(s.getState().lastAction).toEqual(a);
    expect(s.getState().timeline).toEqual([a]);
  });

  it('caps timeline at 200 entries', () => {
    const s = new Store({ partner: 'demo' });
    for (let i = 0; i < 300; i++) {
      s.applyAction({ Action: 'attack', Team: 'home' });
    }
    expect(s.getState().timeline).toHaveLength(200);
  });

  it('merges Details from an action into the event', () => {
    const s = new Store({ partner: 'demo' });
    s.applyAction({
      Action: 'goal',
      Team: 'home',
      Details: {
        id: 1,
        en: 'Real - Barça',
        es: 1,
        si: 1,
        th: { id: 1, name: 'Real' },
        ta: { id: 2, name: 'Barça' },
      },
    });
    expect(s.getState().event?.en).toBe('Real - Barça');
  });

  it('patchTheme merges instead of replacing', () => {
    const s = new Store({
      partner: 'demo',
      theme: { brandName: 'Goal99', primaryColor: '#000' },
    });
    s.patchTheme({ primaryColor: '#10b981' });
    expect(s.getState().theme).toEqual({
      brandName: 'Goal99',
      primaryColor: '#10b981',
    });
  });
});
