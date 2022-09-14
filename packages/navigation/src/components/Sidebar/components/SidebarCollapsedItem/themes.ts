import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE_ALFA, GREEN_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: {
    hover: '--color__navigation__sidebar__collapsed-item__background__hover',
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
      ${COLORS.background.hover}: var(${PURPLE_ALFA[4]});
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
      ${COLORS.background.hover}: var(${GREEN_ALFA[4]});
    }
  }
`;
