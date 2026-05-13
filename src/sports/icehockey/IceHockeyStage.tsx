import { createStage } from '../shared/createStage';
import { ICEHOCKEY_AREA, ICEHOCKEY_VIEW, IceHockeyRink } from './rink';
import { getIceHockeyActionMeta } from './actions';

export const IceHockeyStage = createStage({
  className: 'lmt-stage--icehockey',
  view: ICEHOCKEY_VIEW,
  area: ICEHOCKEY_AREA,
  Pitch: IceHockeyRink,
  getMeta: getIceHockeyActionMeta,
});
