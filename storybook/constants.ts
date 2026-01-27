import { BADGE as Badges } from '@geometricpanda/storybook-addon-badges';

import cloud from '@cloud-ru/figma-tokens-cloud-platform/build/css/brand.module.css';
import gigaid from '@cloud-ru/figma-tokens-giga-id/build/css/brand.module.css';
import gitverse from '@cloud-ru/figma-tokens-gitverse/build/css/brand.module.css';
import web from '@cloud-ru/figma-tokens-web/build/css/brand.module.css';
import DefaultBrandThemes from '@snack-uikit/figma-tokens/build/css/brand.module.css';

enum CustomBadges {
  PRIVATE = 'private',
  STABLE = 'stable',
}

export const BADGE = { ...Badges, ...CustomBadges };

export enum Brand {
  Default = 'default',
  Cloud = 'cloud',
  Gitverse = 'gitverse',
  GigaId = 'gigaid',
  Web = 'web',
}

export const DEFAULT_BRAND_MAP = {
  [Brand.Default]: DefaultBrandThemes,
  [Brand.Cloud]: cloud,
  [Brand.Gitverse]: gitverse,
  [Brand.GigaId]: gigaid,
  [Brand.Web]: web,
};

export const DEFAULT_BRAND_COLORS_MAP = {
  [Brand.Default]: '#06b877',
  [Brand.Cloud]: '#06b877',
  [Brand.Gitverse]: '#5558fa',
  [Brand.GigaId]: '#393a45',
  [Brand.Web]: '#26d07c',
};
