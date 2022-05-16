import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE, PURPLE_ALFA, GREEN, GREEN_ALFA, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  CONTENT: '--color-drop-zone-content',
  BORDER_HOVER: '--color-drop-zone-border-hover',
  BACKGROUND_HOVER: '--color-drop-zone-background-hover',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.CONTENT}: var(${BLACK_ALFA[24]});
      ${COLORS.BORDER_HOVER}: var(${PURPLE[100]});
      ${COLORS.BACKGROUND_HOVER}: var(${PURPLE_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.CONTENT}: var(${WHITE_ALFA[48]});
      ${COLORS.BORDER_HOVER}: var(${PURPLE[50]});
      ${COLORS.BACKGROUND_HOVER}: var(${PURPLE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.CONTENT}: var(${BLACK_ALFA[24]});
      ${COLORS.BORDER_HOVER}: var(${GREEN[100]});
      ${COLORS.BACKGROUND_HOVER}: var(${GREEN_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.CONTENT}: var(${WHITE_ALFA[48]});
      ${COLORS.BORDER_HOVER}: var(${GREEN[50]});
      ${COLORS.BACKGROUND_HOVER}: var(${GREEN_ALFA[16]});
    }
  }
`;
