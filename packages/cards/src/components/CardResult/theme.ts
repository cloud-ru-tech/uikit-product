import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, WHITE_ALFA, PURPLE, GREEN, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  border: {
    default: '--color__cards__card-result__border__default',
    hover: '--color__cards__card-result__border__hover',
  },
  title: {
    default: '--color__cards__card-result__title__default',
    hover: '--color__cards__card-result__title__hover',
  },
  description: '--color__cards__card-result__description',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.border.default}: var(${BLACK_ALFA[8]});
      ${COLORS.border.hover}: var(${PURPLE[100]});

      ${COLORS.title.default}: var(${GREY[800]});
      ${COLORS.title.hover}: var(${PURPLE[100]});

      ${COLORS.description}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.border.default}: var(${WHITE_ALFA[8]});
      ${COLORS.border.hover}: var(${PURPLE[50]});

      ${COLORS.title.default}: var(${GREY[0]});
      ${COLORS.title.hover}: var(${PURPLE[50]});

      ${COLORS.description}: var(${GREY[300]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.border.default}: var(${BLACK_ALFA[8]});
      ${COLORS.border.hover}: var(${GREEN[100]});

      ${COLORS.title.default}: var(${GREY[800]});
      ${COLORS.title.hover}: var(${GREEN[100]});

      ${COLORS.description}: var(${GREY[600]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.border.default}: var(${WHITE_ALFA[8]});
      ${COLORS.border.hover}: var(${GREEN[50]});

      ${COLORS.title.default}: var(${GREY[0]});
      ${COLORS.title.hover}: var(${GREEN[50]});

      ${COLORS.description}: var(${GREY[300]});
    }
  }
`;
