import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  background: {
    hover: '--color__navigation__header-toolbar-item__background__hover',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.hover}: var(${EXPORT_VARS.BLUE_GREY[10]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.hover}: var(${EXPORT_VARS.GREY[800]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.hover}: var(${EXPORT_VARS.BLUE_GREY[10]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.hover}: var(${EXPORT_VARS.GREY[800]});
    }
  }
`;
