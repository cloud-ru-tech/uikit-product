import { ProgressBarProps } from '@snack-uikit/progress-bar';

export type LoadValueType = 'none' | 'percent';

type ProgressLimit = {
  //** =, >, >=, <, <= */
  condition: 'eq' | 'gt' | 'gte' | 'lt' | 'lte';
  limit: number;
  appearance: ProgressBarProps['appearance'];
};

export type ProgressLimitList = ProgressLimit[];
