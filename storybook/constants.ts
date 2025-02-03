import { BADGE as Badges } from '@geometricpanda/storybook-addon-badges';

import CloudBrandThemes from '@sbercloud/figma-tokens-cloud-platform/build/css/brand.module.css';
import MLSpaceBrandThemes from '@sbercloud/figma-tokens-mlspace/build/css/brand.module.css';
import SiteBrandThemes from '@sbercloud/figma-tokens-web/build/css/brand.module.css';
import { Brand as UtilsBrand, Themes } from '@sbercloud/uikit-product-utils';

enum CustomBadges {
  PRIVATE = 'private',
}

export const BADGE = { ...Badges, ...CustomBadges };

export enum Brand {
  Cloud = 'Cloud',
  MLSpace = 'MLSpace',
  Site = 'Site',
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
  [Brand.Site]: {
    [Mode.Light]: Themes.Green,
    [Mode.Dark]: Themes.GreenDark,
  },
};

export const BRAND_TO_BRAND_MODE_MAP: Record<Brand, Record<Mode, UtilsBrand>> = {
  [Brand.Cloud]: {
    [Mode.Light]: UtilsBrand.Cloud,
    [Mode.Dark]: UtilsBrand.CloudDark,
  },
  [Brand.MLSpace]: {
    [Mode.Light]: UtilsBrand.MLSpace,
    [Mode.Dark]: UtilsBrand.MLSpaceDark,
  },
  [Brand.Site]: {
    [Mode.Light]: UtilsBrand.Site,
    [Mode.Dark]: UtilsBrand.SiteDark,
  },
};

export const DEFAULT_BRAND_MAP = {
  [Brand.Cloud]: CloudBrandThemes,
  [Brand.MLSpace]: MLSpaceBrandThemes,
  [Brand.Site]: SiteBrandThemes,
};

export const DEFAULT_BRAND_COLORS_MAP = {
  [Brand.Cloud]: '#06b877',
  [Brand.MLSpace]: '#5558fa',
  [Brand.Site]: '#26d07c',
};
