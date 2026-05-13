/**
 * Registry for the soccer actions documented in §"Actions list" of the
 * provider PDF.
 *
 * `kind`:
 *  - `positional` → drawn as ball marker + player tip on the pitch.
 *  - `banner`     → drawn as a centered overlay banner.
 *  - `silent`     → tracked in the store / timeline but not rendered on
 *                   the pitch (used by stats-only events).
 */
export type ActionKind = 'positional' | 'banner' | 'silent';

export interface ActionMeta {
  kind: ActionKind;
  label: string;
  /** Optional accent color (e.g., red for danger-attack, green for goal). */
  color?: string;
  /** Short human label for the timeline (defaults to `label`). */
  short?: string;
}

export const SOCCER_ACTIONS: Record<string, ActionMeta> = {
  // ── Lote A: core flow ───────────────────────────────────────────
  possession: { kind: 'positional', label: 'Possession' },
  attack: { kind: 'positional', label: 'Attack', color: '#facc15' },
  'danger-attack': {
    kind: 'positional',
    label: 'Dangerous Attack',
    color: '#ef4444',
  },
  kickoff: { kind: 'banner', label: 'KICK OFF', color: '#10b981' },
  halftime: { kind: 'banner', label: 'HALF TIME', color: '#facc15' },
  'second-half': { kind: 'banner', label: '2ND HALF', color: '#10b981' },
  fulltime: { kind: 'banner', label: 'FULL TIME', color: '#facc15' },
  'match-ended': {
    kind: 'banner',
    label: 'MATCH ENDED',
    color: '#94a3b8',
  },

  // ── Lote B: ball actions ────────────────────────────────────────
  goal: { kind: 'banner', label: 'GOAL!', color: '#10b981' },
  'goal-kick': { kind: 'positional', label: 'Goal Kick' },
  corner: { kind: 'positional', label: 'Corner', color: '#facc15' },
  throw: { kind: 'positional', label: 'Throw-in' },
  'shot-on-target': {
    kind: 'positional',
    label: 'Shot on Target',
    color: '#facc15',
  },
  'shot-off-target': { kind: 'positional', label: 'Shot off Target' },
  offside: { kind: 'banner', label: 'OFFSIDE', color: '#facc15' },

  // ── Lote C: disciplinary ────────────────────────────────────────
  'yellow-card': {
    kind: 'banner',
    label: 'YELLOW CARD',
    color: '#facc15',
  },
  'red-card': { kind: 'banner', label: 'RED CARD', color: '#ef4444' },
  substitution: {
    kind: 'banner',
    label: 'SUBSTITUTION',
    color: '#0ea5e9',
  },
  injury: { kind: 'positional', label: 'Injury', color: '#ef4444' },
  'injury-time': {
    kind: 'banner',
    label: 'INJURY TIME',
    color: '#facc15',
  },
  var: { kind: 'banner', label: 'VAR', color: '#a855f7' },
  'disallowed-goal': {
    kind: 'banner',
    label: 'GOAL DISALLOWED',
    color: '#ef4444',
  },

  // ── Lote D: free kicks & penalties ──────────────────────────────
  'safe-free-kick': { kind: 'positional', label: 'Free Kick' },
  'danger-free-kick': {
    kind: 'positional',
    label: 'Free Kick',
    color: '#ef4444',
    short: 'Free Kick (danger)',
  },
  penalty: { kind: 'banner', label: 'PENALTY!', color: '#ef4444' },
  'penalty-shoot': {
    kind: 'positional',
    label: 'Penalty Shoot',
    color: '#facc15',
  },
  'penalty-take': { kind: 'positional', label: 'Penalty Take' },
  'penalty-missing': {
    kind: 'banner',
    label: 'PENALTY MISSED',
    color: '#94a3b8',
  },
  'penalty-scored': {
    kind: 'banner',
    label: 'PENALTY SCORED!',
    color: '#10b981',
  },

  // ── Lote E: extra time ─────────────────────────────────────────
  'extra-time-1': {
    kind: 'banner',
    label: 'EXTRA TIME 1',
    color: '#facc15',
  },
  'extra-time-ht': {
    kind: 'banner',
    label: 'EXTRA TIME HT',
    color: '#facc15',
  },
  'extra-time-2': {
    kind: 'banner',
    label: 'EXTRA TIME 2',
    color: '#facc15',
  },
  'extra-time-ended': {
    kind: 'banner',
    label: 'EXTRA TIME ENDED',
    color: '#94a3b8',
  },
};

export function getSoccerActionMeta(action: string): ActionMeta {
  return (
    SOCCER_ACTIONS[action] ?? {
      kind: 'silent',
      label: action,
    }
  );
}
