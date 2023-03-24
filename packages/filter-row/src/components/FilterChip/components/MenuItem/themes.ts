import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREEN_ALFA, PURPLE_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: {
    hover: '--color__filter-row__menu-item__background',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background.hover}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background.hover}: var(${WHITE_ALFA[8]});
    }
  }
`;
