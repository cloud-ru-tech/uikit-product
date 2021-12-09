import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS, EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  TEXT: '--dropdown-text-color',
  TEXT_DISABLED: '--dropdown-text-disabled-color',
  MENU_BACKGROUND: '--dropdown-menu-background-color',
  MENU_ITEM_HOVER_BACKGROUND: '--dropdown-menu-item-hover-background-color',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.TEXT}: var(${DEPRECATED_EXPORT_VARS.COLORS_GENERAL.TEXT});
      ${COLORS.TEXT_DISABLED}: var(${BLACK_ALFA[24]});
      ${COLORS.MENU_BACKGROUND}: var(${DEPRECATED_EXPORT_VARS.COLORS.WHITE});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_2});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.TEXT}: var(${DEPRECATED_EXPORT_VARS.COLORS_GENERAL.TEXT});
      ${COLORS.TEXT_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.MENU_BACKGROUND}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_8});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_7});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.TEXT}: var(${DEPRECATED_EXPORT_VARS.COLORS_GENERAL.TEXT});
      ${COLORS.TEXT_DISABLED}: var(${BLACK_ALFA[24]});
      ${COLORS.MENU_BACKGROUND}: var(${DEPRECATED_EXPORT_VARS.COLORS.WHITE});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_2});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.TEXT}: var(${DEPRECATED_EXPORT_VARS.COLORS_GENERAL.TEXT});
      ${COLORS.TEXT_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.MENU_BACKGROUND}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_8});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_7});
    }
  }
`;
