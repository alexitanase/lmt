import type { ActionMeta } from '../soccer/actions';

/**
 * Minimal action registry. The provider PDF doesn't enumerate baseball
 * actions; unknown values fall through to `silent`.
 */
export const BASEBALL_ACTIONS: Record<string, ActionMeta> = {
  possession: { kind: 'positional', label: 'At Bat' },
  hit: { kind: 'positional', label: 'Hit', color: '#facc15' },
  strike: { kind: 'banner', label: 'STRIKE', color: '#ef4444' },
  ball: { kind: 'banner', label: 'BALL', color: '#0ea5e9' },
  out: { kind: 'banner', label: 'OUT', color: '#94a3b8' },
  run: { kind: 'banner', label: 'RUN!', color: '#10b981' },
  'home-run': { kind: 'banner', label: 'HOME RUN!', color: '#10b981' },
  'inning-end': { kind: 'banner', label: 'END OF INNING', color: '#facc15' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getBaseballActionMeta(action: string): ActionMeta {
  return BASEBALL_ACTIONS[action] ?? { kind: 'silent', label: action };
}
