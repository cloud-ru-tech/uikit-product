import { ValueOf } from '@snack-uikit/utils';

import { Appearance, Color } from './constants';

type ColorType = ValueOf<typeof Color>;

export type AppearanceType = ValueOf<typeof Appearance>;

export type WithColor = {
  appearance: Exclude<AppearanceType, 'brand' | 'graphite'>;
  color?: ColorType;
};

export type WithoutColor = {
  appearance: Exclude<AppearanceType, 'decor'>;
  color?: never;
};
