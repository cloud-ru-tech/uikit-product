import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  background: {
    hover: '--color__navigation__header-project-selector-item__background__hover',
    selected: '--color__navigation__header-project-selector-item__background__selected',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.hover}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.background.selected}: var(${EXPORT_VARS.BLACK_ALFA[4]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.hover}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.background.selected}: var(${EXPORT_VARS.WHITE_ALFA[4]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.hover}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.background.selected}: var(${EXPORT_VARS.BLACK_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.hover}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.background.selected}: var(${EXPORT_VARS.WHITE_ALFA[4]});
    }
  }
`;
