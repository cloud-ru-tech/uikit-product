import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { BLACK_ALFA, WHITE_ALFA, GREEN, PURPLE, GREY, GREEN_ALFA, PURPLE_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: {
    default: '--color__filter-row__filter-trigger__background__default',
    hover: '--color__filter-row__filter-trigger__background__hover',
  },
  icon: {
    default: '--color__filter-row__filter-trigger__icon__default',
    hover: '--color__filter-row__filter-trigger__icon__hover',
  },
  text: {
    default: '--color__filter-row__filter-trigger__text__default',
    hover: '--color__filter-row__filter-trigger__text__hover',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background.default}: var(${BLACK_ALFA[4]});
      ${COLORS.background.hover}: var(${PURPLE_ALFA[8]});
      ${COLORS.icon.default}: var(${BLACK_ALFA[48]});
      ${COLORS.icon.hover}: var(${PURPLE[100]});
      ${COLORS.text.default}: var(${GREY[800]});
      ${COLORS.text.hover}: var(${PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.hover}: var(${PURPLE_ALFA[24]});
      ${COLORS.icon.default}: var(${WHITE_ALFA[48]});
      ${COLORS.icon.hover}: var(${PURPLE[50]});
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.hover}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background.default}: var(${BLACK_ALFA[4]});
      ${COLORS.background.hover}: var(${GREEN_ALFA[8]});
      ${COLORS.icon.default}: var(${BLACK_ALFA[48]});
      ${COLORS.icon.hover}: var(${GREEN[125]});
      ${COLORS.text.default}: var(${GREY[800]});
      ${COLORS.text.hover}: var(${GREEN[125]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.hover}: var(${GREEN_ALFA[24]});
      ${COLORS.icon.default}: var(${WHITE_ALFA[48]});
      ${COLORS.icon.hover}: var(${GREEN[50]});
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.hover}: var(${GREEN[50]});
    }
  }
`;
