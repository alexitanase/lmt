import { Sports } from '../core/types';
import { AmericanFootballStage } from './americanfootball/AmericanFootballStage';
import { BaseballStage } from './baseball/BaseballStage';
import { BasketballStage } from './basketball/BasketballStage';
import { CricketStage } from './cricket/CricketStage';
import { HandballStage } from './handball/HandballStage';
import { IceHockeyStage } from './icehockey/IceHockeyStage';
import { RugbyStage } from './rugby/RugbyStage';
import { SoccerStage } from './soccer/SoccerStage';
import { TableTennisStage } from './tabletennis/TableTennisStage';
import { TennisStage } from './tennis/TennisStage';
import { VolleyballStage } from './volleyball/VolleyballStage';
import type { SportStage } from './types';

const registry: Record<number, SportStage> = {
  [Sports.Soccer]: SoccerStage,
  [Sports.IceHockey]: IceHockeyStage,
  [Sports.Basketball]: BasketballStage,
  [Sports.Tennis]: TennisStage,
  [Sports.Baseball]: BaseballStage,
  [Sports.Volleyball]: VolleyballStage,
  [Sports.Rugby]: RugbyStage,
  [Sports.Handball]: HandballStage,
  [Sports.TableTennis]: TableTennisStage,
  [Sports.AmericanFootball]: AmericanFootballStage,
  [Sports.Cricket]: CricketStage,
};

export function getSportStage(sportId: number | undefined): SportStage | null {
  if (typeof sportId !== 'number') return null;
  return registry[sportId] ?? null;
}

export const SUPPORTED_SPORTS = Object.keys(registry).map(Number);
