import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  text: {
    count: '--color-tab__counter-text__count',
    notify: '--color-tab__counter-text__notify',
  },
  background: {
    count: '--color-tab__counter-background__count',
    notify: '--color-tab__counter-background__notify',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.text.count}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.text.notify}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.background.count}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.background.notify}: var(${EXPORT_VARS.PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.text.count}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.text.notify}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.count}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.background.notify}: var(${EXPORT_VARS.PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.text.count}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.text.notify}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.background.count}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.background.notify}: var(${EXPORT_VARS.GREEN[115]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.text.count}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.text.notify}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.count}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.background.notify}: var(${EXPORT_VARS.GREEN[50]});
    }
  }
`;
