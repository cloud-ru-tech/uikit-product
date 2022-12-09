import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  background: {
    hover: '--color__navigation__header-toolbar-item__background__hover',
  },
  icon: '--color__navigation__header-toolbar-item__icon',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.icon}: var(${EXPORT_VARS.GREY[200]});
      ${COLORS.background.hover}: var(${EXPORT_VARS.PURPLE_ALFA[4]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.icon}: var(${EXPORT_VARS.GREY[450]});
      ${COLORS.background.hover}: var(${EXPORT_VARS.PURPLE_ALFA[4]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.icon}: var(${EXPORT_VARS.GREY[200]});
      ${COLORS.background.hover}: var(${EXPORT_VARS.GREEN_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.icon}: var(${EXPORT_VARS.GREY[450]});
      ${COLORS.background.hover}: var(${EXPORT_VARS.GREEN_ALFA[4]});
    }
  }
`;
