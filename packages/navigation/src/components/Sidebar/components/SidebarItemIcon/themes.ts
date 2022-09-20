import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE, GREY, GREEN, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  icon: {
    default: '--color__navigation__sidebar__item__icon__default',
    disabled: '--color__navigation__sidebar__item__icon__disabled',
    selected: '--color__navigation__sidebar__item__icon__selected',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.icon.default}: var(${GREY[300]});
      ${COLORS.icon.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.icon.selected}: var(${PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.icon.default}: var(${WHITE_ALFA[24]});
      ${COLORS.icon.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.selected}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.icon.default}: var(${GREY[300]});
      ${COLORS.icon.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.icon.selected}: var(${GREEN[135]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.icon.default}: var(${WHITE_ALFA[24]});
      ${COLORS.icon.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.selected}: var(${GREEN[50]});
    }
  }
`;
