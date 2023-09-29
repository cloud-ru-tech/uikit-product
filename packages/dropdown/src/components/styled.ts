import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const containerClassName = css`
  color: var(${COLORS.TEXT});
  padding: 0;
`;

export const menuClassName = css`
  background-color: var(${COLORS.MENU_BACKGROUND});

  /* 9 elements */
  max-height: 332px;
  overflow-y: auto;
`;

export const menuItemClassName = css`
  ${TEXT_2_STYLES};

  &:hover {
    background-color: var(${COLORS.MENU_ITEM_HOVER_BACKGROUND});
  }

  &[data-selected] {
    background-color: var(${COLORS.MENU_ITEM_ACTIVE_BACKGROUND});
  }

  &:active {
    background-color: var(${COLORS.MENU_ITEM_PRESSED_BACKGROUND});
  }

  &[data-disabled],
  &[data-disabled]:hover {
    background-color: unset;
    color: var(${COLORS.TEXT_DISABLED});
  }

  &[data-disabled]:hover {
    cursor: not-allowed;
  }
`;

export const Wrapper = styled.span`
  cursor: pointer;
  display: inline-flex;
`;
