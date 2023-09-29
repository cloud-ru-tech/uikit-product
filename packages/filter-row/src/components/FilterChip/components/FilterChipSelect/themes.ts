import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { WHITE_ALFA, GREY } = EXPORT_VARS;

export const COLORS = {
  groupHeader: '--color__filter-row__group-header',
};

export const LIGHT_THEMES = css`
  :global() {
    body[data-theme=${Themes.Purple}],
    body[data-theme=${Themes.Green}] {
      ${COLORS.groupHeader}: var(${GREY[350]});
    }
  }
`;

export const DARK_THEMES = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}],
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.groupHeader}: var(${WHITE_ALFA[48]});
    }
  }
`;
