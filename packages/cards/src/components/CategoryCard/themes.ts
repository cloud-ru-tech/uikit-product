import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, WHITE_ALFA, PURPLE, GREEN, BLACK_ALFA, GREEN_ALFA, PURPLE_ALFA } = EXPORT_VARS;

export const COLORS = {
  BACKGROUND: '--color-category-card-background',
  TEXT: '--color-category-card-text',
  IMAGE_BACKGROUND: '--color-category-card-image-background',
  IMAGE_FILL: '--color-category-card-image-fill',
  HOVER_BACKGROUND: '--color-category-card-hover-background',
  HOVER_SHADOW: '--color-category-card-hover-shadow',
  ARROW_BACKGROUND: '--color-arrow-background',
  ARROW_FILL: '--color-arrow-fill',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.BACKGROUND}: var(${GREY[0]});
      ${COLORS.TEXT}: var(${GREY[600]});
      ${COLORS.IMAGE_BACKGROUND}: var(${PURPLE_ALFA[8]});
      ${COLORS.IMAGE_FILL}: var(${PURPLE[100]});
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
      ${COLORS.IMAGE_BACKGROUND}: var(${PURPLE_ALFA[24]});
      ${COLORS.IMAGE_FILL}: var(${PURPLE[25]});
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
      ${COLORS.IMAGE_BACKGROUND}: var(${GREEN_ALFA[8]});
      ${COLORS.IMAGE_FILL}: var(${GREEN[100]});
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
      ${COLORS.IMAGE_BACKGROUND}: var(${GREEN_ALFA[24]});
      ${COLORS.IMAGE_FILL}: var(${GREEN[25]});
      ${COLORS.HOVER_BACKGROUND}: var(${WHITE_ALFA[16]});
      ${COLORS.HOVER_SHADOW}: transparent;
    }
  }
`;
