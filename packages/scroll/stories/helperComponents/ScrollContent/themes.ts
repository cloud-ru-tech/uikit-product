import { css } from '@linaria/core';

import { EXPORT_VARS, GLOBAL_CSS_COLOR, Themes } from '@sbercloud/uikit-product-theme';

export const SCROLL_CONTENT = {
  background: {
    primary: '--color__scroll__scroll-content__background-color__primary',
    dark: '--color__scroll__scroll-content__background-color__dark',
  },
  text: {
    primary: '--color__scroll__scroll-content__text-color__primary',
    dark: '--color__scroll__scroll-content__text-color__dark',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${SCROLL_CONTENT.background.primary}: var(${EXPORT_VARS.GREY[0]});
      ${SCROLL_CONTENT.text.primary}: var(${GLOBAL_CSS_COLOR.TEXT});

      ${SCROLL_CONTENT.background.dark}: var(${GLOBAL_CSS_COLOR.BACKGROUND_DARK});
      ${SCROLL_CONTENT.text.dark}: var(${EXPORT_VARS.GREY[200]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${SCROLL_CONTENT.background.primary}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${SCROLL_CONTENT.text.primary}: var(${GLOBAL_CSS_COLOR.TEXT});

      ${SCROLL_CONTENT.background.dark}: var(${GLOBAL_CSS_COLOR.BACKGROUND_DARK});
      ${SCROLL_CONTENT.text}: var(${GLOBAL_CSS_COLOR.TEXT});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${SCROLL_CONTENT.background.primary}: var(${EXPORT_VARS.GREY[0]});
      ${SCROLL_CONTENT.text.primary}: var(${GLOBAL_CSS_COLOR.TEXT});

      ${SCROLL_CONTENT.background.dark}: var(${GLOBAL_CSS_COLOR.BACKGROUND_DARK});
      ${SCROLL_CONTENT.text.dark}: var(${EXPORT_VARS.GREY[200]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${SCROLL_CONTENT.background.primary}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${SCROLL_CONTENT.text.primary}: var(${GLOBAL_CSS_COLOR.TEXT});

      ${SCROLL_CONTENT.background.dark}: var(${GLOBAL_CSS_COLOR.BACKGROUND_DARK});
      ${SCROLL_CONTENT.text.dark}: var(${GLOBAL_CSS_COLOR.TEXT});
    }
  }
`;
