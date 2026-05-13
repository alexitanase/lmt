import type { ActionMeta } from '../soccer/actions';

export const VOLLEYBALL_ACTIONS: Record<string, ActionMeta> = {
  timeout: { kind: 'banner', label: 'TIMEOUT', color: '#0ea5e9' },
  'point-scored': { kind: 'banner', label: 'POINT', color: '#10b981' },
  fault: { kind: 'banner', label: 'FAULT', color: '#ef4444' },
  stat: { kind: 'silent', label: 'Stat update' },
  'end-of-set': { kind: 'banner', label: 'END OF SET', color: '#facc15' },
  rally: { kind: 'positional', label: 'Rally', color: '#facc15' },
  '?-timeout': { kind: 'banner', label: 'CHALLENGE', color: '#a855f7' },
  'golden-set': { kind: 'banner', label: 'GOLDEN SET', color: '#facc15' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getVolleyballActionMeta(action: string): ActionMeta {
  return VOLLEYBALL_ACTIONS[action] ?? { kind: 'silent', label: action };
}
