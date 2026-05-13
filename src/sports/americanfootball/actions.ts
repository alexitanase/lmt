import type { ActionMeta } from '../soccer/actions';

/**
 * Minimal action registry. The provider PDF doesn't enumerate American
 * football actions; unknown values fall through to `silent`.
 */
export const AMERICANFOOTBALL_ACTIONS: Record<string, ActionMeta> = {
  possession: { kind: 'positional', label: 'Possession' },
  touchdown: { kind: 'banner', label: 'TOUCHDOWN!', color: '#10b981' },
  'field-goal': { kind: 'banner', label: 'FIELD GOAL', color: '#10b981' },
  fumble: { kind: 'banner', label: 'FUMBLE', color: '#ef4444' },
  interception: { kind: 'banner', label: 'INTERCEPTION', color: '#a855f7' },
  'quarter-end': { kind: 'banner', label: 'END OF QUARTER', color: '#facc15' },
  halftime: { kind: 'banner', label: 'HALF TIME', color: '#facc15' },
  fulltime: { kind: 'banner', label: 'FULL TIME', color: '#facc15' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getAmericanFootballActionMeta(action: string): ActionMeta {
  return AMERICANFOOTBALL_ACTIONS[action] ?? { kind: 'silent', label: action };
}
