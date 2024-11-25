import { BADGE as Badges } from '@geometricpanda/storybook-addon-badges';

import AdminBrandThemes from '@sbercloud/figma-tokens-admin/build/css/brand.module.css';
import CloudBrandThemes from '@sbercloud/figma-tokens-cloud-platform/build/css/brand.module.css';
import MLSpaceBrandThemes from '@sbercloud/figma-tokens-mlspace/build/css/brand.module.css';
import SiteBrandThemes from '@sbercloud/figma-tokens-web/build/css/brand.module.css';

enum CustomBadges {
  PRIVATE = 'private',
}

export const BADGE = { ...Badges, ...CustomBadges };

export enum Brand {
  Cloud = 'Cloud',
  MLSpace = 'MLSpace',
  Site = 'Site',
  Admin = 'Admin',
}

export const DEFAULT_BRAND_MAP = {
  [Brand.Cloud]: CloudBrandThemes,
  [Brand.MLSpace]: MLSpaceBrandThemes,
  [Brand.Admin]: AdminBrandThemes,
  [Brand.Site]: SiteBrandThemes,
};

export const DEFAULT_BRAND_COLORS_MAP = {
  [Brand.MLSpace]: '#5558fa',
  [Brand.Cloud]: '#06b877',
  [Brand.Admin]: '#1677ff',
  [Brand.Site]: '#26d07c',
};
