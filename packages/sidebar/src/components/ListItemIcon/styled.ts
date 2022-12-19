import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Icon = styled.div`
  display: flex;
  flex-shrink: 0;

  width: 20px;
  height: 20px;

  svg {
    width: 100%;
    height: 100%;

    fill: var(${COLORS.icon.default});

    transition: fill ${ANIMATIONS.TRANSITION};
  }

  &[data-disabled] svg {
    fill: var(${COLORS.icon.disabled});
  }

  &[data-active] svg {
    fill: var(${COLORS.icon.selected});
  }
`;
