import { describe, expect, it } from 'vitest';
import {
  SOCCER_ACTIONS,
  getSoccerActionMeta,
} from '../src/sports/soccer/actions';

const REQUIRED_ACTIONS = [
  // Lote A
  'possession',
  'attack',
  'danger-attack',
  'kickoff',
  'halftime',
  'second-half',
  'fulltime',
  'match-ended',
  // Lote B
  'goal',
  'goal-kick',
  'corner',
  'throw',
  'shot-on-target',
  'shot-off-target',
  'offside',
  // Lote C
  'yellow-card',
  'red-card',
  'substitution',
  'injury',
  'injury-time',
  'var',
  'disallowed-goal',
  // Lote D
  'safe-free-kick',
  'danger-free-kick',
  'penalty',
  'penalty-shoot',
  'penalty-take',
  'penalty-missing',
  'penalty-scored',
  // Lote E
  'extra-time-1',
  'extra-time-ht',
  'extra-time-2',
  'extra-time-ended',
];

describe('Soccer action registry', () => {
  it('covers every action documented in the provider PDF', () => {
    for (const action of REQUIRED_ACTIONS) {
      expect(SOCCER_ACTIONS, `${action} should be registered`).toHaveProperty(
        action,
      );
    }
  });

  it('classifies headline events as banner and on-pitch events as positional', () => {
    expect(SOCCER_ACTIONS['goal']?.kind).toBe('banner');
    expect(SOCCER_ACTIONS['halftime']?.kind).toBe('banner');
    expect(SOCCER_ACTIONS['fulltime']?.kind).toBe('banner');
    expect(SOCCER_ACTIONS['red-card']?.kind).toBe('banner');
    expect(SOCCER_ACTIONS['var']?.kind).toBe('banner');

    expect(SOCCER_ACTIONS['possession']?.kind).toBe('positional');
    expect(SOCCER_ACTIONS['attack']?.kind).toBe('positional');
    expect(SOCCER_ACTIONS['corner']?.kind).toBe('positional');
    expect(SOCCER_ACTIONS['shot-on-target']?.kind).toBe('positional');
  });

  it('falls back to a silent action for unknown keys', () => {
    const meta = getSoccerActionMeta('totally-made-up');
    expect(meta.kind).toBe('silent');
    expect(meta.label).toBe('totally-made-up');
  });
});
