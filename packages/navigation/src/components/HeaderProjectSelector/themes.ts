import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  noDataLabel: '--color__navigation__header-project-selector__no-data__text',
  searchIconFill: '--color__navigation__header-project-selector__search-icon__fill',
};

export const LIGHT_THEMES = css`
  :global() {
    body[data-theme=${Themes.Purple}],
    body[data-theme=${Themes.Green}] {
      ${COLORS.noDataLabel}: var(${BLACK_ALFA[48]});
      ${COLORS.searchIconFill}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const DARK_THEMES = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}],
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.noDataLabel}: var(${WHITE_ALFA[48]});
      ${COLORS.searchIconFill}: var(${WHITE_ALFA[24]});
    }
  }
`;
