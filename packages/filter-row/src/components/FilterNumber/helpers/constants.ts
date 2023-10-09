import { Texts } from './textsProvider';

export enum Comparison {
  Equal = 'equal',
  NotEqual = 'notEqual',
  More = 'more',
  Less = 'less',
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
