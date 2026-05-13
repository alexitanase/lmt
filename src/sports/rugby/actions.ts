import type { ActionMeta } from '../soccer/actions';

/**
 * Minimal action registry. The provider PDF doesn't enumerate rugby
 * actions; unknown values fall through to `silent`.
 */
export const RUGBY_ACTIONS: Record<string, ActionMeta> = {
  possession: { kind: 'positional', label: 'Possession' },
  try: { kind: 'banner', label: 'TRY!', color: '#10b981' },
  conversion: { kind: 'banner', label: 'CONVERSION', color: '#10b981' },
  penalty: { kind: 'banner', label: 'PENALTY', color: '#ef4444' },
  'drop-goal': { kind: 'banner', label: 'DROP GOAL', color: '#facc15' },
  scrum: { kind: 'positional', label: 'Scrum' },
  lineout: { kind: 'positional', label: 'Lineout' },
  halftime: { kind: 'banner', label: 'HALF TIME', color: '#facc15' },
  fulltime: { kind: 'banner', label: 'FULL TIME', color: '#facc15' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getRugbyActionMeta(action: string): ActionMeta {
  return RUGBY_ACTIONS[action] ?? { kind: 'silent', label: action };
}
