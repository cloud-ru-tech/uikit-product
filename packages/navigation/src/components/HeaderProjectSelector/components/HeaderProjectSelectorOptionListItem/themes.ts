import { css } from '@linaria/core';

import { Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  background: {
    hover: '--color__navigation__header-project-selector-item__background__hover',
    selected: '--color__navigation__header-project-selector-item__background__selected',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.hover}: #ededed;
      ${COLORS.background.selected}: #f5f5f5;
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.hover}: #3c3d41;
      ${COLORS.background.selected}: #45474d;
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.hover}: #ededed;
      ${COLORS.background.selected}: #f5f5f5;
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.hover}: #3c3d41;
      ${COLORS.background.selected}: #45474d;
    }
  }
`;
