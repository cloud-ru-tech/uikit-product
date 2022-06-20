import { ReactText } from 'react';

export const SELECT_TYPES = {
  ROUND_LIGHT: 'round-light',
  ROUND_GRAY: 'round-gray',
  MEDIUM: 'medium',
  LARGE: 'large',
  WITH_LOGO: 'with-logo',
  TAG: 'tag',
  COLOR: 'color',
} as const;

export type MultiselectOptionType = { label: ReactText; value: ReactText; amount?: number };

export type TypeKeys = keyof typeof SELECT_TYPES;
export type SelectType = typeof SELECT_TYPES[TypeKeys];

export enum SelectSizes {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
