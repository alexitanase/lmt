import type { ActionMeta } from '../soccer/actions';

export const TENNIS_ACTIONS: Record<string, ActionMeta> = {
  serve: { kind: 'positional', label: 'Serve', color: '#facc15' },
  'point-scored': { kind: 'banner', label: 'POINT', color: '#10b981' },
  fault: { kind: 'banner', label: 'FAULT', color: '#ef4444' },
  'doble-fault': { kind: 'banner', label: 'DOUBLE FAULT', color: '#ef4444' },
  'break-points': { kind: 'banner', label: 'BREAK POINT', color: '#a855f7' },
  stat: { kind: 'silent', label: 'Stat update' },
  'let-1st-serve': { kind: 'banner', label: 'LET (1st)', color: '#facc15' },
  'let-2nd-serve': { kind: 'banner', label: 'LET (2nd)', color: '#facc15' },
  'game-set-match': { kind: 'banner', label: 'GAME · SET · MATCH', color: '#10b981' },
  'end-of-set': { kind: 'banner', label: 'END OF SET', color: '#facc15' },
  'tie-break': { kind: 'banner', label: 'TIE-BREAK', color: '#a855f7' },
  'rain-delay': { kind: 'banner', label: 'RAIN DELAY', color: '#0ea5e9' },
  'second-set': { kind: 'banner', label: '2ND SET', color: '#10b981' },
  'third-set': { kind: 'banner', label: '3RD SET', color: '#10b981' },
  'fourth-set': { kind: 'banner', label: '4TH SET', color: '#10b981' },
  'final-set': { kind: 'banner', label: 'FINAL SET', color: '#facc15' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getTennisActionMeta(action: string): ActionMeta {
  return TENNIS_ACTIONS[action] ?? { kind: 'silent', label: action };
}
