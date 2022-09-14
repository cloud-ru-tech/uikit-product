import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Icon = styled.div`
  flex-shrink: 0;
  display: flex;
  height: 20px;
  width: 20px;

  svg {
    fill: var(${COLORS.icon.default});
    transition: fill ${ANIMATIONS.TRANSITION};
    height: 100%;
    width: 100%;
  }

  &[data-disabled] svg {
    fill: var(${COLORS.icon.disabled});
  }

  &[data-active] svg {
    fill: var(${COLORS.icon.selected});
  }
`;
