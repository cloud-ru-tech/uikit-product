import { OrganizationAvatarPlaceholderSVG, UserAvatarPlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { StatusDot } from '@sbercloud/uikit-product-status';

import { Sizes, Status, Variants } from './types';

export const PLACEHOLDER_ICONS = {
  [Variants.Company]: <OrganizationAvatarPlaceholderSVG />,
  [Variants.User]: <UserAvatarPlaceholderSVG />,
};

export const ABBREVIATION_LENGTH = 2;

export const SIZES_IN_PX = {
  ExtraSmall: {
    size: '20px',
    fontSize: '10px',
    borderRadius: '4px',
  },
  Small: {
    size: '32px',
    fontSize: '16px',
    borderRadius: '4px',
  },
  Medium: {
    size: '40px',
    fontSize: '20px',
    borderRadius: '8px',
  },
  Large: {
    size: '60px',
    fontSize: '30px',
    borderRadius: '12px',
  },
  ExtraLarge: {
    size: '80px',
    fontSize: '40px',
    borderRadius: '16px',
  },
  ExtraExtraLarge: {
    size: '120px',
    fontSize: '60px',
    borderRadius: '20px',
  },
};

export const STATUS_MAP = {
  types: {
    [Status.Online]: StatusDot.types.Success,
    [Status.Offline]: StatusDot.types.Unactive,
  },
  sizes: {
    [Sizes.ExtraSmall]: StatusDot.sizes.ExtraSmall,
    [Sizes.Small]: StatusDot.sizes.Small,
    [Sizes.Medium]: StatusDot.sizes.Small,
    [Sizes.Large]: StatusDot.sizes.Medium,
    [Sizes.ExtraLarge]: StatusDot.sizes.Large,
    [Sizes.ExtraExtraLarge]: StatusDot.sizes.ExtraLarge,
  },
};
