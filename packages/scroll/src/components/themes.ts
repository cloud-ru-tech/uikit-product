import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const SCROLL_COLORS = {
  background: {
    primary: '--color__scroll__background__primary',
    dark: '--color__scroll__background__dark',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${SCROLL_COLORS.background.primary}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${SCROLL_COLORS.background.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${SCROLL_COLORS.background.primary}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${SCROLL_COLORS.background.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${SCROLL_COLORS.background.primary}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${SCROLL_COLORS.background.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${SCROLL_COLORS.background.primary}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${SCROLL_COLORS.background.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});
    }
  }
`;
