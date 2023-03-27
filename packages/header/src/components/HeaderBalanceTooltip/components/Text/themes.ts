import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  text: {
    secondary: '--color-navigation__header-balance-tooltip__bonuses__text-secondary',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.text.secondary}: var(${EXPORT_VARS.GREY[350]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.text.secondary}: var(${EXPORT_VARS.GREY[500]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.text.secondary}: var(${EXPORT_VARS.GREY[350]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.text.secondary}: var(${EXPORT_VARS.GREY[500]});
    }
  }
`;
