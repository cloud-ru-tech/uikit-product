import { styled } from '@linaria/react';

import { LoadingWheelInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Spinner = styled(LoadingWheelInterfaceSVG)`
  ${ANIMATIONS.LOADING_WHEEL};

  display: block;
  fill: var(${COLORS.fill.default});
`;
