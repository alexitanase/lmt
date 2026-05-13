import { createStage } from '../shared/createStage';
import { HANDBALL_AREA, HANDBALL_VIEW, HandballCourt } from './court';
import { getHandballActionMeta } from './actions';

export const HandballStage = createStage({
  className: 'lmt-stage--handball',
  view: HANDBALL_VIEW,
  area: HANDBALL_AREA,
  Pitch: HandballCourt,
  getMeta: getHandballActionMeta,
});
