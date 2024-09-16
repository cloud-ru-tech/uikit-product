import { BUTTON_SIZE, SIZE } from '../../constants';

export const BUTTON_CLEAR_VALUE_SIZE_MAP = {
  [SIZE.Xs]: BUTTON_SIZE.Xxs,
  [SIZE.S]: BUTTON_SIZE.Xs,
  [SIZE.M]: BUTTON_SIZE.Xs,
  [SIZE.L]: BUTTON_SIZE.Xs,
};

export const CHIP_CHOICE_TYPE = {
  Multiple: 'multiple',
  Date: 'date',
  DateRange: 'date-range',
  Single: 'single',
  Custom: 'custom',
} as const;
