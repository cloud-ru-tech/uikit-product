import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  background: {
    default: '--color-navigation__header-balance-tooltip-background__default',
  },
  border: {
    default: '--color-navigation__header-balance-tooltip-border__default',
  },
  text: {
    default: '--color-navigation__header-balance-tooltip-text__default',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.border.default}: transparent;
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[800]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.border.default}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[100]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.border.default}: transparent;
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[800]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.border.default}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[100]});
    }
  }
`;
