import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  background: {
    default: '--color-navigation__header-balance-tooltip-pie-background__default',
  },
  foreground: {
    low: '--color-navigation__header-balance-tooltip-pie-foreground__low',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.foreground.low}: var(${EXPORT_VARS.BERRY_RED[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.WHITE_ALFA[16]});
      ${COLORS.foreground.low}: var(${EXPORT_VARS.BERRY_RED[75]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.foreground.low}: var(${EXPORT_VARS.BERRY_RED[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.WHITE_ALFA[16]});
      ${COLORS.foreground.low}: var(${EXPORT_VARS.BERRY_RED[75]});
    }
  }
`;
