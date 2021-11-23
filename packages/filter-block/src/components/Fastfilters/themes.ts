import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { PURPLE, GREEN, GREY, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  FILL: '--color-fast-filters-fill',
  BG_ACTIVE: '--color-fast-filters-bg-active',
  FILL_HOVER: '--color-fast-filters-fill-hover',
  BG_HOVER: '--color-fast-filters-bg-hover',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.FILL}: var(${GREY[200]});
      ${COLORS.BG_ACTIVE}: var(${BLACK_ALFA[4]});
      ${COLORS.FILL_HOVER}: var(${PURPLE[100]});
      ${COLORS.BG_HOVER}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.FILL}: var(${GREY[200]});
      ${COLORS.BG_ACTIVE}: var(${BLACK_ALFA[4]});
      ${COLORS.FILL_HOVER}: var(${PURPLE[100]});
      ${COLORS.BG_HOVER}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.FILL}: var(${GREY[200]});
      ${COLORS.BG_ACTIVE}: var(${BLACK_ALFA[4]});
      ${COLORS.FILL_HOVER}: var(${GREEN[100]});
      ${COLORS.BG_HOVER}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.FILL}: var(${GREY[200]});
      ${COLORS.BG_ACTIVE}: var(${BLACK_ALFA[4]});
      ${COLORS.FILL_HOVER}: var(${GREEN[100]});
      ${COLORS.BG_HOVER}: var(${BLACK_ALFA[4]});
    }
  }
`;
