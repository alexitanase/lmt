import type { ComponentType } from 'preact';
import type { ActionModel, EventModel, ThemeConfig } from '../core/types';

export interface SportStageProps {
  event: EventModel;
  lastAction: ActionModel | null;
  theme: ThemeConfig;
}

export type SportStage = ComponentType<SportStageProps>;
