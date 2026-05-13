import { createStage } from '../shared/createStage';
import { BASKETBALL_AREA, BASKETBALL_VIEW, BasketballCourt } from './pitch';
import { getBasketballActionMeta } from './actions';

export const BasketballStage = createStage({
  className: 'lmt-stage--basketball',
  view: BASKETBALL_VIEW,
  area: BASKETBALL_AREA,
  Pitch: BasketballCourt,
  getMeta: getBasketballActionMeta,
});
