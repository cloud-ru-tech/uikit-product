import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, WHITE_ALFA, PURPLE, GREEN } = EXPORT_VARS;

export const COLORS = {
  background: '--color__cards__wide-card__background',
  description: '--color__cards__wide-card__description',
  signature: '--color__cards__wide-card__signature',
  title: {
    hover: '--color__cards__wide-card__title__hover',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.description}: var(${GREY[600]});
      ${COLORS.signature}: var(${GREY[350]});
      ${COLORS.title.hover}: var(${PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background}: var(${WHITE_ALFA[8]});
      ${COLORS.description}: var(${GREY[300]});
      ${COLORS.signature}: var(${GREY[500]});
      ${COLORS.title.hover}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.description}: var(${GREY[600]});
      ${COLORS.signature}: var(${GREY[350]});
      ${COLORS.title.hover}: var(${GREEN[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background}: var(${WHITE_ALFA[8]});
      ${COLORS.description}: var(${GREY[300]});
      ${COLORS.signature}: var(${GREY[500]});
      ${COLORS.title.hover}: var(${GREEN[50]});
    }
  }
`;
