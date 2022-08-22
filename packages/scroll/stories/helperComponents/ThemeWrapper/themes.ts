import { css } from '@linaria/core';

import { EXPORT_VARS, GLOBAL_CSS_COLOR, Themes } from '@sbercloud/uikit-product-theme';

export const THEME_WRAPPER = {
  background: {
    primary: '--color__scroll__theme-wrapper__background-color__primary',
    dark: '--color__scroll__theme-wrapper__background-color__dark',
  },
  text: {
    primary: '--color__scroll__theme-wrapper__text-color__primary',
    dark: '--color__scroll__theme-wrapper__text-color__dark',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${THEME_WRAPPER.background.primary}: var(${EXPORT_VARS.GREY[0]});
      ${THEME_WRAPPER.text.primary}: var(${GLOBAL_CSS_COLOR.TEXT});

      ${THEME_WRAPPER.background.dark}: var(${GLOBAL_CSS_COLOR.BACKGROUND_DARK});
      ${THEME_WRAPPER.text.dark}: var(${EXPORT_VARS.GREY[200]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${THEME_WRAPPER.background.primary}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${THEME_WRAPPER.text.primary}: var(${GLOBAL_CSS_COLOR.TEXT});

      ${THEME_WRAPPER.background.dark}: var(${GLOBAL_CSS_COLOR.BACKGROUND_DARK});
      ${THEME_WRAPPER.text}: var(${GLOBAL_CSS_COLOR.TEXT});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${THEME_WRAPPER.background.primary}: var(${EXPORT_VARS.GREY[0]});
      ${THEME_WRAPPER.text.primary}: var(${GLOBAL_CSS_COLOR.TEXT});

      ${THEME_WRAPPER.background.dark}: var(${GLOBAL_CSS_COLOR.BACKGROUND_DARK});
      ${THEME_WRAPPER.text.dark}: var(${EXPORT_VARS.GREY[200]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${THEME_WRAPPER.background.primary}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${THEME_WRAPPER.text.primary}: var(${GLOBAL_CSS_COLOR.TEXT});

      ${THEME_WRAPPER.background.dark}: var(${GLOBAL_CSS_COLOR.BACKGROUND_DARK});
      ${THEME_WRAPPER.text.dark}: var(${GLOBAL_CSS_COLOR.TEXT});
    }
  }
`;
