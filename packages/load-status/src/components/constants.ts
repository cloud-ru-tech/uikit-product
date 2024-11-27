import { LoadValueType, ProgressLimitList } from './types';

export const DEFAULT_APPEARANCE_BY_PROGRESS: ProgressLimitList = [
  { appearance: 'green', condition: 'lte', limit: 70 },
  { appearance: 'yellow', condition: 'lte', limit: 90 },
  { appearance: 'red', condition: 'lte', limit: 100 },
];

export const SYMBOL_BY_TYPE: Record<LoadValueType, string> = {
  none: '',
  percent: '%',
};
