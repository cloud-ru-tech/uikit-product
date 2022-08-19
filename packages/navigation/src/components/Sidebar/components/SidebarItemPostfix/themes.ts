import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLACK_ALFA, WHITE_ALFA, GREEN, PURPLE } = EXPORT_VARS;

export const COLORS = {
  lock: {
    default: '--color__navigation__sidebar__item-postfix__lock__default',
    disabled: '--color__navigation__sidebar__item-postfix__lock__disabled',
  },
  arrow: {
    default: '--color__navigation__sidebar__item-postfix__arrow__default',
    disabled: '--color__navigation__sidebar__item-postfix__arrow__disabled',
    selected: '--color__navigation__sidebar__item-postfix__arrow__selected',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
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
      ${COLORS.lock.default}: var(${GREY[400]});
      ${COLORS.lock.disabled}: var(${WHITE_ALFA[16]});

      ${COLORS.arrow.default}: var(${GREY[400]});
      ${COLORS.arrow.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.arrow.selected}: var(${GREEN[50]});
    }
  }
`;
