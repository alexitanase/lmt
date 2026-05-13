import type { BallPosition } from '../../core/types';

/** Pitch playable area in SVG user units (used by `projectBall`). */
export interface PitchArea {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Projected {
  x: number;
  y: number;
}

/**
 * Map a normalized BallPosition [0..1, 0..1] from the provider to SVG
 * coordinates inside the playable pitch area. Returns null when the
 * input is missing or malformed.
 */
export function projectBall(
  bp: BallPosition | undefined,
  area: PitchArea,
): Projected | null {
  if (!bp || !Array.isArray(bp) || bp.length < 2) return null;
  const xRaw = Number(bp[0]);
  const yRaw = Number(bp[1]);
  if (!Number.isFinite(xRaw) || !Number.isFinite(yRaw)) return null;
  const x = Math.max(0, Math.min(1, xRaw));
  const y = Math.max(0, Math.min(1, yRaw));
  return { x: area.x + x * area.w, y: area.y + y * area.h };
}
