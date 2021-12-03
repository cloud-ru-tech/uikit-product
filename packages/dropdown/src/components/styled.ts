import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const containerClassName = css`
  color: var(${COLORS.TEXT_COLOR});
  padding: 0;
`;

export const menuClassName = css`
  background-color: var(${COLORS.MENU_BACKGROUND_COLOR});
`;

export const menuItemClassName = css`
  &:hover {
    background-color: var(${COLORS.MENU_ITEM_HOVER_BACKGROUND_COLOR});
  }
`;

export const Wrapper = styled.span`
  display: inline-flex;
`;
