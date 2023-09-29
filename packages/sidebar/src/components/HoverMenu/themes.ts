import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY } = EXPORT_VARS;

export const COLORS = {
  background: '--color__navigation__hover-menu__background',
};

export const LIGHT_THEMES = css`
  :global() {
    body[data-theme=${Themes.Purple}],
    body[data-theme=${Themes.Green}] {
      ${COLORS.background}: var(${GREY[0]});
    }
  }
`;

export const DARK_THEMES = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}],
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background}: var(${GREY[850]});
    }
  }
`;
