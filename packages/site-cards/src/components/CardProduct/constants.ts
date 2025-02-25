import { ComponentType } from 'react';

import { LAYOUT_TYPE, LayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

export const MapLayoutToTitleTypography = {
  [LAYOUT_TYPE.Desktop]: Typography.SansTitleM,
  [LAYOUT_TYPE.DesktopSmall]: Typography.SansTitleM,
  [LAYOUT_TYPE.Mobile]: Typography.SansLabelL,
  [LAYOUT_TYPE.Tablet]: Typography.SansLabelL,
} as const satisfies Record<LayoutType, ComponentType>;
