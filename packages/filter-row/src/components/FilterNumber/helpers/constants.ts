import { Texts } from './texts-provider';

export enum Comparison {
  Equal = 'Equal',
  NotEqual = 'NotEqual',
  More = 'More',
  Less = 'Less',
}

export const COMPARE_OPTIONS = [
  {
    textKey: Texts.Equal,
    value: Comparison.Equal,
  },
  {
    textKey: Texts.NotEqual,
    value: Comparison.NotEqual,
  },
  {
    textKey: Texts.More,
    value: Comparison.More,
    singleModeOnly: true,
  },
  {
    textKey: Texts.Less,
    value: Comparison.Less,
    singleModeOnly: true,
  },
];

export const DEFAULT_FILTER_VALUE = {
  startValue: undefined,
  endValue: undefined,
  comparison: undefined,
};
