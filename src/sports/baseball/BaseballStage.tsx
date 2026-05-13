import { createStage } from '../shared/createStage';
import { BASEBALL_AREA, BASEBALL_VIEW, BaseballDiamond } from './diamond';
import { getBaseballActionMeta } from './actions';

export const BaseballStage = createStage({
  className: 'lmt-stage--baseball',
  view: BASEBALL_VIEW,
  area: BASEBALL_AREA,
  Pitch: BaseballDiamond,
  getMeta: getBaseballActionMeta,
});
