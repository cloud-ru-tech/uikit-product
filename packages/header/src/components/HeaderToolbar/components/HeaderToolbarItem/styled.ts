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

  cursor: pointer;

  display: flex;
  gap: 12px;
  align-items: center;

  width: 100%;
  padding: 2px 16px;

  color: unset;

  fill: var(${COLORS.icon});

  transition: background-color ${ANIMATIONS.TRANSITION};

  &:hover {
    background-color: var(${COLORS.background.hover});
  }
`;
