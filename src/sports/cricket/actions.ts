import type { ActionMeta } from '../soccer/actions';

/**
 * Minimal action registry. The provider PDF doesn't enumerate cricket
 * actions; unknown values fall through to `silent`.
 */
export const CRICKET_ACTIONS: Record<string, ActionMeta> = {
  possession: { kind: 'positional', label: 'At Bat' },
  run: { kind: 'banner', label: 'RUN', color: '#10b981' },
  four: { kind: 'banner', label: 'FOUR!', color: '#10b981' },
  six: { kind: 'banner', label: 'SIX!', color: '#10b981' },
  wicket: { kind: 'banner', label: 'WICKET!', color: '#ef4444' },
  'over-end': { kind: 'banner', label: 'END OF OVER', color: '#facc15' },
  innings: { kind: 'banner', label: 'INNINGS', color: '#facc15' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getCricketActionMeta(action: string): ActionMeta {
  return CRICKET_ACTIONS[action] ?? { kind: 'silent', label: action };
}
