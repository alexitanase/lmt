import { describe, expect, it } from 'vitest';
import { projectBall } from '../src/sports/shared/projection';
import { SOCCER_PITCH_AREA } from '../src/sports/soccer/pitch';

describe('projectBall', () => {
  it('returns null on missing or malformed input', () => {
    expect(projectBall(undefined, SOCCER_PITCH_AREA)).toBeNull();
    expect(projectBall([], SOCCER_PITCH_AREA)).toBeNull();
    expect(projectBall(['x' as unknown as number, 0.5], SOCCER_PITCH_AREA)).toBeNull();
  });

  it('maps 0 → left edge and 1 → right edge of the playable area', () => {
    expect(projectBall([0, 0], SOCCER_PITCH_AREA)).toEqual({ x: 20, y: 50 });
    expect(projectBall([1, 1], SOCCER_PITCH_AREA)).toEqual({ x: 1030, y: 660 });
  });

  it('clamps inputs outside [0,1]', () => {
    expect(projectBall([-0.5, 1.5], SOCCER_PITCH_AREA)).toEqual({
      x: 20,
      y: 660,
    });
  });

  it('maps 0.5,0.5 to the center of the pitch', () => {
    const center = projectBall([0.5, 0.5], SOCCER_PITCH_AREA);
    expect(center).toEqual({ x: 525, y: 355 });
  });

  it('accepts string-encoded coords (per provider examples)', () => {
    expect(projectBall(['0.86', '0.44'], SOCCER_PITCH_AREA)).toEqual({
      x: 20 + 0.86 * 1010,
      y: 50 + 0.44 * 610,
    });
  });
});
