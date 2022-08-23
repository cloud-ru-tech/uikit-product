import { styled } from '@linaria/react';

import { ANIMATIONS, SHADOW } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: 238px;
  padding: 16px 0 24px;
  border-right: 1px solid var(${COLORS.border});
  background-color: var(${COLORS.background});
  box-shadow: transparent;
  transition: box-shadow ${ANIMATIONS.TRANSITION};

  &:hover {
    box-shadow: ${SHADOW.LARGE};
  }

  &,
  * {
    box-sizing: border-box;
  }
`;
