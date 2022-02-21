import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { PURPLE, GREY, WHITE_ALFA, BLACK_ALFA, GREEN } = EXPORT_VARS;

export const COLORS = {
  DISABLED_TEXT: '--color-checkbox-disabled-text',
  UNCHECKED: {
    BORDER: '--color-checkbox-unchecked-border',
    HOVER_BORDER: '--color-checkbox-unchecked-hover-border',
    DISABLED_BORDER: '--color-checkbox-unchecked-disabled-border',
    DISABLED_BACKGROUND: '--color-checkbox-unchecked-disabled-background',
  },
  CHECKED: {
    BACKGROUND: '--color-checkbox-checked-background',
    HOVER_BACKGROUND: '--color-checkbox-checked-hover-background',
    DISABLED_BACKGROUND: '--color-checkbox-checked-disabled-background',
    ICON_FILL: '--color-checkbox-checked-icon-fill',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.UNCHECKED.BORDER}: var(${BLACK_ALFA[24]});
      ${COLORS.UNCHECKED.HOVER_BORDER}: var(${BLACK_ALFA[48]});
      ${COLORS.UNCHECKED.DISABLED_BORDER}: var(${BLACK_ALFA[8]});
      ${COLORS.UNCHECKED.DISABLED_BACKGROUND}: var(${BLACK_ALFA[4]});
      ${COLORS.CHECKED.BACKGROUND}: var(${PURPLE[100]});
      ${COLORS.CHECKED.HOVER_BACKGROUND}: var(${PURPLE[115]});
      ${COLORS.CHECKED.DISABLED_BACKGROUND}: var(${BLACK_ALFA[16]});
      ${COLORS.CHECKED.ICON_FILL}: var(${GREY[0]});
      ${COLORS.DISABLED_TEXT}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.UNCHECKED.BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.UNCHECKED.HOVER_BORDER}: var(${WHITE_ALFA[48]});
      ${COLORS.UNCHECKED.DISABLED_BORDER}: var(${WHITE_ALFA[8]});
      ${COLORS.UNCHECKED.DISABLED_BACKGROUND}: var(${WHITE_ALFA[4]});
      ${COLORS.CHECKED.BACKGROUND}: var(${PURPLE[50]});
      ${COLORS.CHECKED.HOVER_BACKGROUND}: var(${PURPLE[25]});
      ${COLORS.CHECKED.DISABLED_BACKGROUND}: var(${WHITE_ALFA[16]});
      ${COLORS.CHECKED.ICON_FILL}: var(${GREY[800]});
      ${COLORS.DISABLED_TEXT}: var(${WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.UNCHECKED.BORDER}: var(${BLACK_ALFA[24]});
      ${COLORS.UNCHECKED.HOVER_BORDER}: var(${BLACK_ALFA[48]});
      ${COLORS.UNCHECKED.DISABLED_BORDER}: var(${BLACK_ALFA[8]});
      ${COLORS.UNCHECKED.DISABLED_BACKGROUND}: var(${BLACK_ALFA[4]});
      ${COLORS.CHECKED.BACKGROUND}: var(${GREEN[100]});
      ${COLORS.CHECKED.HOVER_BACKGROUND}: var(${GREEN[115]});
      ${COLORS.CHECKED.DISABLED_BACKGROUND}: var(${BLACK_ALFA[16]});
      ${COLORS.CHECKED.ICON_FILL}: var(${GREY[0]});
      ${COLORS.DISABLED_TEXT}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.UNCHECKED.BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.UNCHECKED.HOVER_BORDER}: var(${WHITE_ALFA[48]});
      ${COLORS.UNCHECKED.DISABLED_BORDER}: var(${WHITE_ALFA[8]});
      ${COLORS.UNCHECKED.DISABLED_BACKGROUND}: var(${WHITE_ALFA[4]});
      ${COLORS.CHECKED.BACKGROUND}: var(${GREEN[50]});
      ${COLORS.CHECKED.HOVER_BACKGROUND}: var(${GREEN[25]});
      ${COLORS.CHECKED.DISABLED_BACKGROUND}: var(${WHITE_ALFA[16]});
      ${COLORS.CHECKED.ICON_FILL}: var(${GREY[800]});
      ${COLORS.DISABLED_TEXT}: var(${WHITE_ALFA[24]});
    }
  }
`;
