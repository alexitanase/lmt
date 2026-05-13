import type { ActionMeta } from '../soccer/actions';

export const ICEHOCKEY_ACTIONS: Record<string, ActionMeta> = {
  possession: { kind: 'positional', label: 'Possession' },
  goal: { kind: 'banner', label: 'GOAL!', color: '#10b981' },
  penalty: { kind: 'banner', label: 'PENALTY', color: '#ef4444' },
  'penalty-shot': { kind: 'positional', label: 'Penalty Shot', color: '#facc15' },
  'penalty-shot-missed': {
    kind: 'banner',
    label: 'PENALTY MISSED',
    color: '#94a3b8',
  },
  'penalty-overplay': {
    kind: 'positional',
    label: 'Penalty Overplay',
    color: '#facc15',
  },
  shot: { kind: 'positional', label: 'Shot', color: '#facc15' },
  'pulled-keeper': {
    kind: 'banner',
    label: 'PULLED KEEPER',
    color: '#a855f7',
  },
  'keeper-back-in-goal': {
    kind: 'banner',
    label: 'KEEPER BACK',
    color: '#0ea5e9',
  },
  faceoff: { kind: 'positional', label: 'Face-off' },
  'puck-dropped': { kind: 'banner', label: 'PUCK DROP', color: '#10b981' },
  'faceoff-winner': { kind: 'positional', label: 'Face-off Won' },
  'event-timeout': { kind: 'banner', label: 'TIMEOUT', color: '#0ea5e9' },
  icing: { kind: 'banner', label: 'ICING', color: '#facc15' },
  powerplay: { kind: 'banner', label: 'POWER PLAY', color: '#a855f7' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getIceHockeyActionMeta(action: string): ActionMeta {
  return ICEHOCKEY_ACTIONS[action] ?? { kind: 'silent', label: action };
}
