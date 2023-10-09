import { Texts } from './textsProvider';

export enum Comparison {
  Contains = 'contains',
  NotContain = 'notContain',
}

export const COMPARE_OPTIONS = [
  {
    textKey: Texts.Contains,
    value: Comparison.Contains,
  },
  {
    textKey: Texts.NotContain,
    value: Comparison.NotContain,
  },
];

export const DEFAULT_FILTER_VALUE = {
  value: undefined,
  comparison: undefined,
};
