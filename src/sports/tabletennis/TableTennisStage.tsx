import { createStage } from '../shared/createStage';
import {
  TABLETENNIS_AREA,
  TABLETENNIS_VIEW,
  TableTennisTable,
} from './table';
import { getTableTennisActionMeta } from './actions';

export const TableTennisStage = createStage({
  className: 'lmt-stage--tabletennis',
  view: TABLETENNIS_VIEW,
  area: TABLETENNIS_AREA,
  Pitch: TableTennisTable,
  getMeta: getTableTennisActionMeta,
});
