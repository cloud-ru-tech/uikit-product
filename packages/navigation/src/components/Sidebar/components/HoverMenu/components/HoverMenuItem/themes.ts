import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE_ALFA, GREEN_ALFA, BLACK_ALFA, WHITE_ALFA, GREY, GREEN, PURPLE } = EXPORT_VARS;

export const COLORS = {
  background: {
    hover: '--color__navigation__hover-menu-item__background__hover',
  },
  text: {
    default: '--color__navigation__hover-menu-item__text__default',
    selected: '--color__navigation__hover-menu-item__text__selected',
    disabled: '--color__navigation__hover-menu-item__text__disabled',
  },
  lockIconFill: {
    default: '--color__navigation__hover-menu-item__lock-icon__fill__default',
    disabled: '--color__navigation__hover-menu-item__lock-icon__fill__disabled',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});
      ${COLORS.text.default}: var(${GREY[600]});
      ${COLORS.text.selected}: var(${PURPLE[100]});
      ${COLORS.text.disabled}: var(${BLACK_ALFA[24]});
      ${COLORS.lockIconFill.default}: var(${GREY[400]});
      ${COLORS.lockIconFill.disabled}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.selected}: var(${PURPLE[50]});
      ${COLORS.text.disabled}: var(${WHITE_ALFA[24]});
      ${COLORS.lockIconFill.default}: var(${WHITE_ALFA[24]});
      ${COLORS.lockIconFill.disabled}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});
      ${COLORS.text.default}: var(${GREY[600]});
      ${COLORS.text.selected}: var(${GREEN[135]});
      ${COLORS.text.disabled}: var(${BLACK_ALFA[24]});
      ${COLORS.lockIconFill.default}: var(${GREY[400]});
      ${COLORS.lockIconFill.disabled}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.selected}: var(${GREEN[50]});
      ${COLORS.text.disabled}: var(${WHITE_ALFA[24]});
      ${COLORS.lockIconFill.default}: var(${WHITE_ALFA[24]});
      ${COLORS.lockIconFill.disabled}: var(${WHITE_ALFA[16]});
    }
  }
`;
