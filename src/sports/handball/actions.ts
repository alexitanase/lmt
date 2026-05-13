import type { ActionMeta } from '../soccer/actions';

/**
 * The provider PDF does not enumerate specific handball actions. This
 * registry covers a minimal-but-reasonable set; unknown actions fall
 * through to `silent` so the stream is not blocked.
 */
export const HANDBALL_ACTIONS: Record<string, ActionMeta> = {
  possession: { kind: 'positional', label: 'Possession' },
  goal: { kind: 'banner', label: 'GOAL!', color: '#10b981' },
  shot: { kind: 'positional', label: 'Shot', color: '#facc15' },
  penalty: { kind: 'banner', label: '7m PENALTY', color: '#ef4444' },
  foul: { kind: 'positional', label: 'Foul', color: '#ef4444' },
  'yellow-card': { kind: 'banner', label: 'YELLOW CARD', color: '#facc15' },
  'red-card': { kind: 'banner', label: 'RED CARD', color: '#ef4444' },
  timeout: { kind: 'banner', label: 'TIMEOUT', color: '#0ea5e9' },
  halftime: { kind: 'banner', label: 'HALF TIME', color: '#facc15' },
  fulltime: { kind: 'banner', label: 'FULL TIME', color: '#facc15' },
  'match-ended': { kind: 'banner', label: 'MATCH ENDED', color: '#94a3b8' },
};

export function getHandballActionMeta(action: string): ActionMeta {
  return HANDBALL_ACTIONS[action] ?? { kind: 'silent', label: action };
}
