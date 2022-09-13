import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';
const { BLACK_ALFA, BLUE_GREY, GREY, WHITE_ALFA } = EXPORT_VARS;
export const COLORS = {
  background: {
    default: '--color__navigation__header__background__default',
  },
  border: {
    default: '--color__navigation__header__border__default',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.default}: var(${BLUE_GREY[5]});
      ${COLORS.border.default}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.default}: var(${GREY[900]});
      ${COLORS.border.default}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.default}: var(${BLUE_GREY[5]});
      ${COLORS.border.default}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.default}: var(${GREY[900]});
      ${COLORS.border.default}: var(${WHITE_ALFA[16]});
    }
  }
`;
