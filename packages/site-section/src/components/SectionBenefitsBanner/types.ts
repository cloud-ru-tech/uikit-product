import { ValueOf } from '@snack-uikit/utils';

export const Appearance = {
  Decor: 'decor',
  Brand: 'brand',
  Graphite: 'graphite',
} as const;

export const Color = {
  Neutral: 'neutral',
  White: 'white',
  Violet: 'violet',
  Blue: 'blue',
} as const;

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

export type ColorsProps = (WithColor | WithoutColor) & {
  backgroundType: 'color';
  backgroundImage?: never;
};

type WithBgImage = {
  backgroundType: 'image';
  backgroundImage: string;
  appearance?: never;
  color?: never;
};

export type BackgroundType = ColorsProps | WithBgImage;
