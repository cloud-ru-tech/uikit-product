import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE, PURPLE_ALFA, GREY, GREEN, GREEN_ALFA, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: {
    hover: '--color__navigation__sidebar__collapsed-item__background__hover',
  },
  icon: {
    default: '--color__navigation__sidebar__collapsed-item__icon__default',
    disabled: '--color__navigation__sidebar__collapsed-item__icon__disabled',
    selected: '--color__navigation__sidebar__collapsed-item__icon__selected',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});

      ${COLORS.icon.default}: var(${GREY[400]});
      ${COLORS.icon.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.icon.selected}: var(${PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});

      ${COLORS.icon.default}: var(${WHITE_ALFA[24]});
      ${COLORS.icon.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.selected}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});

      ${COLORS.icon.default}: var(${GREY[400]});
      ${COLORS.icon.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.icon.selected}: var(${GREEN[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});

      ${COLORS.icon.default}: var(${WHITE_ALFA[24]});
      ${COLORS.icon.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.selected}: var(${GREEN[50]});
    }
  }
`;
