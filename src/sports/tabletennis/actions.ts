import type { ActionMeta } from '../soccer/actions';

export const TABLETENNIS_ACTIONS: Record<string, ActionMeta> = {
  serve: { kind: 'positional', label: 'Serve', color: '#facc15' },
  'point-scored': { kind: 'banner', label: 'POINT', color: '#10b981' },
  'end-of-set': { kind: 'banner', label: 'END OF SET', color: '#facc15' },
  'end-of-1st-set': { kind: 'banner', label: 'END SET 1', color: '#facc15' },
  'end-of-2nd-set': { kind: 'banner', label: 'END SET 2', color: '#facc15' },
  'end-of-3rd-set': { kind: 'banner', label: 'END SET 3', color: '#facc15' },
  'end-of-4th-set': { kind: 'banner', label: 'END SET 4', color: '#facc15' },
  'end-of-final-set': { kind: 'banner', label: 'END FINAL SET', color: '#facc15' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getTableTennisActionMeta(action: string): ActionMeta {
  return TABLETENNIS_ACTIONS[action] ?? { kind: 'silent', label: action };
}
