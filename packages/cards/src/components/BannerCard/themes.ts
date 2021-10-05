import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  BACKGROUND: '--color-banner-card-background',
  TEXT: '--color-banner-card-text',
  HOVER_BACKGROUND: '--color-banner-card-hover-background',
  HOVER_SHADOW: '--color-banner-card-hover-shadow',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.BACKGROUND}: var(${GREY[0]});
      ${COLORS.TEXT}: var(${GREY[600]});
      ${COLORS.HOVER_BACKGROUND}: var(${GREY[0]});
      ${COLORS.HOVER_SHADOW}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.BACKGROUND}: var(${WHITE_ALFA[8]});
      ${COLORS.TEXT}: var(${GREY[300]});
      ${COLORS.HOVER_BACKGROUND}: var(${WHITE_ALFA[16]});
      ${COLORS.HOVER_SHADOW}: transparent;
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.BACKGROUND}: var(${GREY[0]});
      ${COLORS.TEXT}: var(${GREY[600]});
      ${COLORS.HOVER_BACKGROUND}: var(${GREY[0]});
      ${COLORS.HOVER_SHADOW}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.BACKGROUND}: var(${WHITE_ALFA[8]});
      ${COLORS.TEXT}: var(${GREY[300]});
      ${COLORS.HOVER_BACKGROUND}: var(${WHITE_ALFA[16]});
      ${COLORS.HOVER_SHADOW}: transparent;
    }
  }
`;
