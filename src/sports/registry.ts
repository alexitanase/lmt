import { Sports } from '../core/types';
import { BasketballStage } from './basketball/BasketballStage';
import { IceHockeyStage } from './icehockey/IceHockeyStage';
import { SoccerStage } from './soccer/SoccerStage';
import { TennisStage } from './tennis/TennisStage';
import type { SportStage } from './types';

const registry: Record<number, SportStage> = {
  [Sports.Soccer]: SoccerStage,
  [Sports.IceHockey]: IceHockeyStage,
  [Sports.Basketball]: BasketballStage,
  [Sports.Tennis]: TennisStage,
};

export function getSportStage(sportId: number | undefined): SportStage | null {
  if (typeof sportId !== 'number') return null;
  return registry[sportId] ?? null;
}

export const SUPPORTED_SPORTS = Object.keys(registry).map(Number);
