import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: '--color__cards__wide-card__background',
  description: '--color__cards__wide-card__description',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.description}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background}: var(${WHITE_ALFA[8]});
      ${COLORS.description}: var(${GREY[300]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.description}: var(${GREY[600]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background}: var(${WHITE_ALFA[8]});
      ${COLORS.description}: var(${GREY[300]});
    }
  }
`;
