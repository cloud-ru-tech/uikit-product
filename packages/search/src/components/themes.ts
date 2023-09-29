import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { WHITE_ALFA, BLACK_ALFA, GREY } = EXPORT_VARS;

export const COLORS = {
  background: {
    default: '--color__search__background__default',
    disabled: '--color__search__background__disabled',
  },
  border: {
    default: '--color__search__border__default',
    disabled: '--color__search__border__disabled',
  },
  icon: {
    default: '--color__search__icon__fill__default',
    disabled: '--color__search__icon__fill__disabled',
  },
  placeholder: {
    default: '--color__search__placeholder__default',
    disabled: '--color__search__placeholder__disabled',
  },
};

export const LIGHT_THEMES = css`
  :global() {
    body[data-theme=${Themes.Purple}],
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.disabled}: var(${GREY[25]});
      ${COLORS.border.default}: var(${GREY[100]});
      ${COLORS.border.disabled}: var(${GREY[100]});
      ${COLORS.icon.default}: var(${BLACK_ALFA[24]});
      ${COLORS.icon.disabled}: var(${BLACK_ALFA[8]});
      ${COLORS.placeholder.default}: var(${GREY[350]});
      ${COLORS.placeholder.disabled}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const DARK_THEMES = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}],
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.disabled}: var(${WHITE_ALFA[4]});
      ${COLORS.border.default}: var(${WHITE_ALFA[16]});
      ${COLORS.border.disabled}: var(${WHITE_ALFA[8]});
      ${COLORS.icon.default}: var(${WHITE_ALFA[24]});
      ${COLORS.icon.disabled}: var(${WHITE_ALFA[8]});
      ${COLORS.placeholder.default}: var(${WHITE_ALFA[48]});
      ${COLORS.placeholder.disabled}: var(${WHITE_ALFA[16]});
    }
  }
`;
