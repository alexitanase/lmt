import type { ActionMeta } from '../soccer/actions';

export const BASKETBALL_ACTIONS: Record<string, ActionMeta> = {
  possession: { kind: 'positional', label: 'Possession' },
  '1-pts': { kind: 'banner', label: '+1 PT', color: '#facc15' },
  '2-pts': { kind: 'banner', label: '+2 PTS', color: '#10b981' },
  '3-pts': { kind: 'banner', label: '+3 PTS!', color: '#10b981' },
  freethrow: { kind: 'positional', label: 'Free Throw' },
  'freethrow-scored': {
    kind: 'banner',
    label: 'FT SCORED',
    color: '#10b981',
  },
  'freethrow-missed': {
    kind: 'banner',
    label: 'FT MISSED',
    color: '#94a3b8',
  },
  'throw-missed': {
    kind: 'positional',
    label: 'Throw Missed',
    color: '#94a3b8',
  },
  timeout: { kind: 'banner', label: 'TIMEOUT', color: '#0ea5e9' },
  'quarter-end': { kind: 'banner', label: 'END OF QUARTER', color: '#facc15' },
  'half-end': { kind: 'banner', label: 'HALF TIME', color: '#facc15' },
  overtime: { kind: 'banner', label: 'OVERTIME', color: '#a855f7' },
  foul: { kind: 'positional', label: 'Foul', color: '#ef4444' },
  'quarter-1': { kind: 'banner', label: 'Q1', color: '#10b981' },
  'quarter-2': { kind: 'banner', label: 'Q2', color: '#10b981' },
  'quarter-3': { kind: 'banner', label: 'Q3', color: '#10b981' },
  'quarter-4': { kind: 'banner', label: 'Q4', color: '#10b981' },
  'half-first': { kind: 'banner', label: '1ST HALF', color: '#10b981' },
  'half-second': { kind: 'banner', label: '2ND HALF', color: '#10b981' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getBasketballActionMeta(action: string): ActionMeta {
  return BASKETBALL_ACTIONS[action] ?? { kind: 'silent', label: action };
}
