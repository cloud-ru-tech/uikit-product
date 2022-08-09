import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { BLACK_ALFA, WHITE_ALFA, PURPLE, GREEN } = EXPORT_VARS;

export const COLORS = {
  row: {
    empty: '--color__stepper__row__background__empty',
    filled: '--color__stepper__row__background__filled',
  },
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme=${Themes.Purple}] {
      ${COLORS.row.empty}: var(${BLACK_ALFA[8]});
      ${COLORS.row.filled}: var(${PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.PurpleDark}] {
      ${COLORS.row.empty}: var(${WHITE_ALFA[16]});
      ${COLORS.row.filled}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme=${Themes.Green}] {
      ${COLORS.row.empty}: var(${BLACK_ALFA[8]});
      ${COLORS.row.filled}: var(${GREEN[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.GreenDark}] {
      ${COLORS.row.empty}: var(${WHITE_ALFA[16]});
      ${COLORS.row.filled}: var(${GREEN[100]});
    }
  }
`;
