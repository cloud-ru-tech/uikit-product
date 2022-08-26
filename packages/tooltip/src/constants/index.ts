import { TooltipType } from '../helpers/types';

export const DELAY = {
  [TooltipType.Instant]: 0,
  [TooltipType.Truncated]: 500,
  [TooltipType.Tip]: 1500,
};

export const OFFSET: [number, number] = [0, 8];
