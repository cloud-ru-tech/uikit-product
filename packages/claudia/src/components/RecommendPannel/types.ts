import { ValueOf } from '@snack-uikit/utils';

export enum CHIP_TYPE {
  Default = 'default',
  Outline = 'outline',
}

export type ChipType = ValueOf<typeof CHIP_TYPE>;

export type ChipProps = {
  id: string;
  label: string;
  onClick?: () => void;
};

export enum SIZE {
  S = 's',
  M = 'm',
}

export type Size = ValueOf<typeof SIZE>;
