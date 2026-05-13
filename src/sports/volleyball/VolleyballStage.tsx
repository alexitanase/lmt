import { createStage } from '../shared/createStage';
import { VOLLEYBALL_AREA, VOLLEYBALL_VIEW, VolleyballCourt } from './court';
import { getVolleyballActionMeta } from './actions';

export const VolleyballStage = createStage({
  className: 'lmt-stage--volleyball',
  view: VOLLEYBALL_VIEW,
  area: VOLLEYBALL_AREA,
  Pitch: VolleyballCourt,
  getMeta: getVolleyballActionMeta,
});
