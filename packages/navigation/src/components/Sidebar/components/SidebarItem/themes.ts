import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE, PURPLE_ALFA, GREY, GREEN, GREEN_ALFA, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  text: {
    default: '--color__navigation__sidebar__item__text__default',
    disabled: '--color__navigation__sidebar__item__text__disabled',
    selected: '--color__navigation__sidebar__item__text__selected',
  },
  background: {
    hover: '--color__navigation__sidebar__item__background__hover',
  },
  icon: {
    default: '--color__navigation__sidebar__item__icon__default',
    disabled: '--color__navigation__sidebar__item__icon__disabled',
    selected: '--color__navigation__sidebar__item__icon__selected',
  },
  lock: {
    default: '--color__navigation__sidebar__item__lock__default',
    disabled: '--color__navigation__sidebar__item__lock__disabled',
  },
  arrow: {
    default: '--color__navigation__sidebar__item__arrow__default',
    disabled: '--color__navigation__sidebar__item__arrow__disabled',
    selected: '--color__navigation__sidebar__item__arrow__selected',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.text.default}: var(${GREY[600]});
      ${COLORS.text.disabled}: var(${BLACK_ALFA[24]});
      ${COLORS.text.selected}: var(${PURPLE[100]});

      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});

      ${COLORS.icon.default}: var(${GREY[400]});
      ${COLORS.icon.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.icon.selected}: var(${PURPLE[100]});

      ${COLORS.lock.default}: var(${GREY[400]});
      ${COLORS.lock.disabled}: var(${BLACK_ALFA[16]});

      ${COLORS.arrow.default}: var(${GREY[400]});
      ${COLORS.arrow.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.arrow.selected}: var(${PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.disabled}: var(${WHITE_ALFA[24]});
      ${COLORS.text.selected}: var(${PURPLE[50]});

      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});

      ${COLORS.icon.default}: var(${WHITE_ALFA[24]});
      ${COLORS.icon.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.selected}: var(${PURPLE[50]});

      ${COLORS.lock.default}: var(${GREY[400]});
      ${COLORS.lock.disabled}: var(${WHITE_ALFA[16]});

      ${COLORS.arrow.default}: var(${GREY[400]});
      ${COLORS.arrow.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.arrow.selected}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.text.default}: var(${GREY[600]});
      ${COLORS.text.disabled}: var(${BLACK_ALFA[24]});
      ${COLORS.text.selected}: var(${GREEN[100]});

      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});

      ${COLORS.icon.default}: var(${GREY[400]});
      ${COLORS.icon.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.icon.selected}: var(${GREEN[100]});

      ${COLORS.lock.default}: var(${GREY[400]});
      ${COLORS.lock.disabled}: var(${BLACK_ALFA[16]});

      ${COLORS.arrow.default}: var(${GREY[400]});
      ${COLORS.arrow.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.arrow.selected}: var(${GREEN[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.disabled}: var(${WHITE_ALFA[24]});
      ${COLORS.text.selected}: var(${GREEN[50]});

      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});

      ${COLORS.icon.default}: var(${WHITE_ALFA[24]});
      ${COLORS.icon.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.selected}: var(${GREEN[50]});

      ${COLORS.lock.default}: var(${GREY[400]});
      ${COLORS.lock.disabled}: var(${WHITE_ALFA[16]});

      ${COLORS.arrow.default}: var(${GREY[400]});
      ${COLORS.arrow.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.arrow.selected}: var(${GREEN[50]});
    }
  }
`;
