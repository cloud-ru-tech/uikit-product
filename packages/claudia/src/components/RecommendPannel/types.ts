import { ValueOf } from '@snack-uikit/utils';

export const CHIP_TYPE = {
  Default: 'default',
  Outline: 'outline',
} as const;

export type ChipType = ValueOf<typeof CHIP_TYPE>;

export type ChipProps = {
  id: string;
  label: string;
  onClick?: () => void;
};

export const SIZE = {
  S: 's',
  M: 'm',
} as const;

export type Size = ValueOf<typeof SIZE>;
