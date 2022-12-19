import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Item = styled.div`
  cursor: pointer;

  width: 100%;
  padding: 8px 16px;

  background-color: transparent;

  transition: background-color ${ANIMATIONS.TRANSITION};

  &:not([data-disabled]) {
    &:hover {
      background-color: var(${COLORS.background.hover});
    }
  }

  &[data-disabled] {
    cursor: not-allowed;
  }
`;
