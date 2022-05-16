import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  text: {
    default: '--color-pagination__button-text__default',
    hover: '--color-pagination__button-text__hover',
  },
  background: {
    hover: '--color-pagination__button-background__hover',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.text.hover}: var(${EXPORT_VARS.PURPLE[150]});
      ${COLORS.background.hover}: var(${EXPORT_VARS.BLACK_ALFA[4]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.text.hover}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.background.hover}: var(${EXPORT_VARS.WHITE_ALFA[4]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.text.hover}: var(${EXPORT_VARS.GREEN[115]});
      ${COLORS.background.hover}: var(${EXPORT_VARS.BLACK_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.text.hover}: var(${EXPORT_VARS.GREEN[50]});
      ${COLORS.background.hover}: var(${EXPORT_VARS.WHITE_ALFA[4]});
    }
  }
`;
