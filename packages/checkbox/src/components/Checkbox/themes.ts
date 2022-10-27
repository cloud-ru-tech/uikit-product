import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  DISABLED_TEXT: '--color__checkbox__text__disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.DISABLED_TEXT}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.DISABLED_TEXT}: var(${WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.DISABLED_TEXT}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.DISABLED_TEXT}: var(${WHITE_ALFA[24]});
    }
  }
`;
