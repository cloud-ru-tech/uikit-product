import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE, PURPLE_ALFA, GREY, GREEN, GREEN_ALFA, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  text: {
    default: '--color__navigation__sidebar__item__text__default',
    disabled: '--color__navigation__sidebar__item__text__disabled',
    active: '--color__navigation__sidebar__item__text__active',
  },
  background: {
    hover: '--color__navigation__sidebar__item__background__hover',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.text.default}: var(${GREY[800]});
      ${COLORS.text.disabled}: var(${BLACK_ALFA[24]});
      ${COLORS.text.active}: var(${PURPLE[100]});

      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.disabled}: var(${WHITE_ALFA[24]});
      ${COLORS.text.active}: var(${PURPLE[50]});

      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.text.default}: var(${GREY[800]});
      ${COLORS.text.disabled}: var(${BLACK_ALFA[24]});
      ${COLORS.text.active}: var(${GREEN[100]});

      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.disabled}: var(${WHITE_ALFA[24]});
      ${COLORS.text.active}: var(${GREEN[50]});

      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});
    }
  }
`;
