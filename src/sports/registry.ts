import { Sports } from '../core/types';
import { SoccerStage } from './soccer/SoccerStage';
import type { SportStage } from './types';

const registry: Record<number, SportStage> = {
  [Sports.Soccer]: SoccerStage,
};

export function getSportStage(sportId: number | undefined): SportStage | null {
  if (typeof sportId !== 'number') return null;
  return registry[sportId] ?? null;
}

export const SUPPORTED_SPORTS = Object.keys(registry).map(Number);
