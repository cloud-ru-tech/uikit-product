import { BADGE as Badges } from '@geometricpanda/storybook-addon-badges';

import CloudBrandThemes from '@sbercloud/figma-tokens-cloud-platform/build/css/brand.module.css';
import MLSpaceBrandThemes from '@sbercloud/figma-tokens-mlspace/build/css/brand.module.css';
import { Themes } from '@sbercloud/uikit-product-theme';

enum CustomBadges {
  PRIVATE = 'private',
}

export const BADGE = { ...Badges, ...CustomBadges };

export enum Brand {
  Cloud = 'Cloud',
  MLSpace = 'MLSpace',
}

export enum Mode {
  Light = 'Light',
  Dark = 'Dark',
}

export const BRAND_TO_THEME_MAP: Record<Brand, Record<Mode, Themes>> = {
  [Brand.Cloud]: {
    [Mode.Light]: Themes.Green,
    [Mode.Dark]: Themes.GreenDark,
  },
  [Brand.MLSpace]: {
    [Mode.Light]: Themes.Purple,
    [Mode.Dark]: Themes.PurpleDark,
  },
};

export const DEFAULT_BRAND_MAP = {
  [Brand.Cloud]: CloudBrandThemes,
  [Brand.MLSpace]: MLSpaceBrandThemes,
};

export const DEFAULT_BRAND_COLORS_MAP = {
  [Brand.MLSpace]: '#5558fa',
  [Brand.Cloud]: '#06b877',
};
