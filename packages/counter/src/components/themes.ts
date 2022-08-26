import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  text: {
    count: {
      primary: '--color__counter__text__count__primary',
      dark: '--color__counter__text__count__dark',
    },
    notify: {
      primary: '--color__counter__text__notify__primary',
      dark: '--color__counter__text__notify__dark',
    },
  },
  background: {
    count: {
      primary: '--color__counter__background__count__primary',
      dark: '--color__counter__background__count__dark',
    },
    notify: {
      primary: '--color__counter__background__notify__primary',
      dark: '--color__counter__background__notify__dark',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.text.count.primary}: var(${EXPORT_VARS.BLACK_ALFA[48]});
      ${COLORS.background.count.primary}: var(${EXPORT_VARS.BLACK_ALFA[4]});

      ${COLORS.text.count.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.background.count.dark}: var(${EXPORT_VARS.WHITE_ALFA[16]});

      ${COLORS.text.notify.primary}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.background.notify.primary}: var(${EXPORT_VARS.PURPLE[100]});

      ${COLORS.text.notify.dark}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.notify.dark}: var(${EXPORT_VARS.PURPLE[50]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.text.count.primary}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.background.count.primary}: var(${EXPORT_VARS.WHITE_ALFA[8]});

      ${COLORS.text.count.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.background.count.dark}: var(${EXPORT_VARS.WHITE_ALFA[16]});

      ${COLORS.text.notify.primary}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.notify.primary}: var(${EXPORT_VARS.PURPLE[50]});

      ${COLORS.text.notify.dark}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.notify.dark}: var(${EXPORT_VARS.PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.text.count.primary}: var(${EXPORT_VARS.BLACK_ALFA[48]});
      ${COLORS.background.count.primary}: var(${EXPORT_VARS.BLACK_ALFA[4]});

      ${COLORS.text.count.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.background.count.dark}: var(${EXPORT_VARS.WHITE_ALFA[16]});

      ${COLORS.text.notify.primary}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.background.notify.primary}: var(${EXPORT_VARS.GREEN[115]});

      ${COLORS.text.notify.dark}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.notify.dark}: var(${EXPORT_VARS.GREEN[50]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.text.count.primary}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.background.count.primary}: var(${EXPORT_VARS.WHITE_ALFA[8]});

      ${COLORS.text.count.dark}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.background.count.dark}: var(${EXPORT_VARS.WHITE_ALFA[16]});

      ${COLORS.text.notify.primary}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.notify.primary}: var(${EXPORT_VARS.GREEN[50]});

      ${COLORS.text.notify.dark}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.notify.dark}: var(${EXPORT_VARS.GREEN[50]});
    }
  }
`;
