import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  TEXT: '--dropdown-text-color',
  TEXT_DISABLED: '--dropdown-text-disabled-color',
  MENU_BACKGROUND: '--dropdown-menu-background-color',
  MENU_ITEM_HOVER_BACKGROUND: '--dropdown-menu-item-hover-background-color',
  MENU_ITEM_ACTIVE_BACKGROUND: '--dropdown-menu-item-active-background-color',
  MENU_ITEM_PRESSED_BACKGROUND: '--dropdown-menu-item-pressed-background-color',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.TEXT}: var(${GREY[800]});
      ${COLORS.TEXT_DISABLED}: var(${GREY[200]});
      ${COLORS.MENU_BACKGROUND}: var(${GREY[0]});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND}: var(${BLACK_ALFA[8]});
      ${COLORS.MENU_ITEM_ACTIVE_BACKGROUND}: var(${BLACK_ALFA[4]});
      ${COLORS.MENU_ITEM_PRESSED_BACKGROUND}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.TEXT}: var(${GREY[100]});
      ${COLORS.TEXT_DISABLED}: var(${GREY[700]});
      ${COLORS.MENU_BACKGROUND}: var(${WHITE_ALFA[4]});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND}: var(${BLACK_ALFA[16]});
      ${COLORS.MENU_ITEM_ACTIVE_BACKGROUND}: var(${BLACK_ALFA[8]});
      ${COLORS.MENU_ITEM_PRESSED_BACKGROUND}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.TEXT}: var(${GREY[800]});
      ${COLORS.TEXT_DISABLED}: var(${GREY[200]});
      ${COLORS.MENU_BACKGROUND}: var(${GREY[0]});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND}: var(${BLACK_ALFA[8]});
      ${COLORS.MENU_ITEM_ACTIVE_BACKGROUND}: var(${BLACK_ALFA[4]});
      ${COLORS.MENU_ITEM_PRESSED_BACKGROUND}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.TEXT}: var(${GREY[100]});
      ${COLORS.TEXT_DISABLED}: var(${GREY[700]});
      ${COLORS.MENU_BACKGROUND}: var(${WHITE_ALFA[4]});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND}: var(${BLACK_ALFA[16]});
      ${COLORS.MENU_ITEM_ACTIVE_BACKGROUND}: var(${BLACK_ALFA[8]});
      ${COLORS.MENU_ITEM_PRESSED_BACKGROUND}: var(${BLACK_ALFA[8]});
    }
  }
`;
