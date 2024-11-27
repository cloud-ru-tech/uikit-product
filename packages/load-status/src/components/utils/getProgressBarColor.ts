import { ProgressBarProps } from '@snack-uikit/progress-bar';

import { ProgressLimitList } from '../types';

export const getProgressBarColor = (progress: number, limits: ProgressLimitList): ProgressBarProps['appearance'] => {
  for (const limit of limits) {
    switch (limit.condition) {
      case 'eq':
        if (progress === limit.limit) {
          return limit.appearance;
        }
        break;
      case 'gt':
        if (progress > limit.limit) {
          return limit.appearance;
        }
        break;
      case 'gte':
        if (progress >= limit.limit) {
          return limit.appearance;
        }
        break;
      case 'lt':
        if (progress < limit.limit) {
          return limit.appearance;
        }
        break;
      case 'lte':
        if (progress <= limit.limit) {
          return limit.appearance;
        }
        break;
      default:
        return 'neutral';
    }
  }

  return 'neutral';
};
