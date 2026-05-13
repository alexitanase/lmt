import { createStage } from '../shared/createStage';
import { RUGBY_AREA, RUGBY_VIEW, RugbyPitch } from './pitch';
import { getRugbyActionMeta } from './actions';

export const RugbyStage = createStage({
  className: 'lmt-stage--rugby',
  view: RUGBY_VIEW,
  area: RUGBY_AREA,
  Pitch: RugbyPitch,
  getMeta: getRugbyActionMeta,
});
