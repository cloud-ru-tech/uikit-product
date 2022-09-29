import { styled } from '@linaria/react';

import { H4_STYLES } from '@sbercloud/uikit-product-typography';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Link = styled.a`
  ${H4_STYLES};

  color: unset;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2px 16px;
  gap: 12px;
  cursor: pointer;
  transition: background-color ${ANIMATIONS.TRANSITION};
  fill: var(${COLORS.icon});

  &:hover {
    background-color: var(${COLORS.background.hover});
  }
`;
