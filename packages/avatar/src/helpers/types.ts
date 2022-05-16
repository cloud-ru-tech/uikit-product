import { MouseEventHandler } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export enum Shapes {
  Round = 'Round',
  Square = 'Square',
}

export enum Sizes {
  ExtraSmall = 'ExtraSmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'ExtraLarge',
  ExtraExtraLarge = 'ExtraExtraLarge',
}

export enum Colors {
  Red = 'Red',
  Pink = 'Pink',
  Violet = 'Violet',
  Blue = 'Blue',
  Green = 'Green',
  Yellow = 'Yellow',
  Orange = 'Orange',
  Brown = 'Brown',
  SilverGray = 'SilverGray',
  Grass = 'Grass',
  Seamount = 'Seamount',
}

export enum Variants {
  User = 'User',
  Company = 'Company',
  Other = 'Other',
}

export enum Status {
  Online = 'Online',
  Offline = 'Offline',
}

export type AvatarProps = WithSupportProps<{
  name: string;
  variant: Variants;
  size?: Sizes;
  src?: string;
  status?: Status;
  onClick?: MouseEventHandler;
  className?: string;
}>;
