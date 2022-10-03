import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';
import { SHADOW } from '@sbercloud/uikit-product-utils';

const { GREY, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: {
    default: '--color__cards__card-banner__background__default',
    hover: '--color__cards__card-banner__background__hover',
    shadow: '--color__cards__card-banner__background__shadow',
  },
  description: '--color__cards__card-banner__description',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.hover}: var(${GREY[0]});
      ${COLORS.background.shadow}: ${SHADOW.MEDIUM};
      ${COLORS.description}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.hover}: var(${WHITE_ALFA[16]});
      ${COLORS.description}: var(${GREY[300]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.hover}: var(${GREY[0]});
      ${COLORS.background.shadow}: ${SHADOW.MEDIUM};
      ${COLORS.description}: var(${GREY[600]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.hover}: var(${WHITE_ALFA[16]});
      ${COLORS.description}: var(${GREY[300]});
    }
  }
`;
