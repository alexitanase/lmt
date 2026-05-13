import { createStage } from '../shared/createStage';
import { CRICKET_AREA, CRICKET_VIEW, CricketGround } from './pitch';
import { getCricketActionMeta } from './actions';

export const CricketStage = createStage({
  className: 'lmt-stage--cricket',
  view: CRICKET_VIEW,
  area: CRICKET_AREA,
  Pitch: CricketGround,
  getMeta: getCricketActionMeta,
});
