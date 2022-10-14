import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const SCROLL_COLORS = {
  background: {
    primary: '--color__scroll__background__primary',
    dark: '--color__scroll__background__dark',
  },
  resize: {
    primary: '--color__scroll__resize__primary',
    dark: '--color__scroll__resize__dark',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${SCROLL_COLORS.background.primary}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${SCROLL_COLORS.background.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});

      ${SCROLL_COLORS.resize.primary}: var(${EXPORT_VARS.GREY[200]});
      ${SCROLL_COLORS.resize.dark}: var(${EXPORT_VARS.GREY[450]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${SCROLL_COLORS.background.primary}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${SCROLL_COLORS.background.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});

      ${SCROLL_COLORS.resize.primary}: var(${EXPORT_VARS.GREY[450]});
      ${SCROLL_COLORS.resize.dark}: var(${EXPORT_VARS.GREY[450]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${SCROLL_COLORS.background.primary}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${SCROLL_COLORS.background.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});

      ${SCROLL_COLORS.resize.primary}: var(${EXPORT_VARS.GREY[200]});
      ${SCROLL_COLORS.resize.dark}: var(${EXPORT_VARS.GREY[450]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${SCROLL_COLORS.background.primary}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${SCROLL_COLORS.background.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});

      ${SCROLL_COLORS.resize.primary}: var(${EXPORT_VARS.GREY[450]});
      ${SCROLL_COLORS.resize.dark}: var(${EXPORT_VARS.GREY[450]});
    }
  }
`;
