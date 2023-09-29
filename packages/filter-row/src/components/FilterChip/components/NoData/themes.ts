import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  text: '--color__filter-row__no-data__text',
  icon: '--color__filter-row__no-data__icon',
};

export const LIGHT_THEMES = css`
  :global() {
    body[data-theme=${Themes.Purple}],
    body[data-theme=${Themes.Green}] {
      ${COLORS.text}: var(${BLACK_ALFA[48]});
      ${COLORS.icon}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const DARK_THEMES = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}],
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.text}: var(${WHITE_ALFA[48]});
      ${COLORS.icon}: var(${WHITE_ALFA[24]});
    }
  }
`;
