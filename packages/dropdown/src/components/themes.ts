import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const COLORS = {
  TEXT_COLOR: '--dropdown-text-color',
  MENU_BACKGROUND_COLOR: '--dropdown-menu-background-color',
  MENU_ITEM_HOVER_BACKGROUND_COLOR: '--dropdown-menu-item-hover-background-color',
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme='${Themes.Purple}'] {
      ${COLORS.TEXT_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS_GENERAL.TEXT});
      ${COLORS.MENU_BACKGROUND_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS.WHITE});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_2});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.PurpleDark}'] {
      ${COLORS.TEXT_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS_GENERAL.TEXT});
      ${COLORS.MENU_BACKGROUND_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_8});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_7});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme='${Themes.Green}'] {
      ${COLORS.TEXT_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS_GENERAL.TEXT});
      ${COLORS.MENU_BACKGROUND_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS.WHITE});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_2});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.GreenDark}'] {
      ${COLORS.TEXT_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS_GENERAL.TEXT});
      ${COLORS.MENU_BACKGROUND_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_8});
      ${COLORS.MENU_ITEM_HOVER_BACKGROUND_COLOR}: var(${DEPRECATED_EXPORT_VARS.COLORS.GRAY_7});
    }
  }
`;
