import { createStage } from '../shared/createStage';
import {
  AMERICANFOOTBALL_AREA,
  AMERICANFOOTBALL_VIEW,
  AmericanFootballField,
} from './field';
import { getAmericanFootballActionMeta } from './actions';

export const AmericanFootballStage = createStage({
  className: 'lmt-stage--americanfootball',
  view: AMERICANFOOTBALL_VIEW,
  area: AMERICANFOOTBALL_AREA,
  Pitch: AmericanFootballField,
  getMeta: getAmericanFootballActionMeta,
});
