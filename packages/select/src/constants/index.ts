import { SelectSizes } from '../helpers/types';

export enum SelectActionTypes {
  RemoveValue = 'remove-value',
  SelectOption = 'select-option',
  PopValue = 'pop-value',
  Reset = 'clear',
}

export const KEYS_TO_BREAK = [',', 'Enter'];

export enum Colors {
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple',
  Pink = 'pink',
  Red = 'red',
  Brown = 'brown',
  Orange = 'orange',
  Yellow = 'yellow',
}

export const COLOR_VALUES = Object.values(Colors);

export const SIZES_IN_PX = {
  [SelectSizes.Small]: {
    minHeight: '28px',
    padding: '0 4px',
  },
  [SelectSizes.Medium]: {
    minHeight: '36px',
    padding: '4px',
  },
  [SelectSizes.Large]: {
    minHeight: '44px',
    padding: '8px',
  },
};

export const INFO_BOX_SIZE = 76;
