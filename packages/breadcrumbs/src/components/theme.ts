import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS, EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';
const { COLORS_BREADCRUMBS } = DEPRECATED_EXPORT_VARS;

export const COLORS = {
  label: {
    active: '--color-breadcrumbs__label__active',
    inactive: '--color-breadcrumbs__label__inactive',
  },
  icon: '--color-breadcrumbs__icon',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.label.active}: var(${COLORS_BREADCRUMBS.ACTIVE_COLOR});
      ${COLORS.label.inactive}: var(${COLORS_BREADCRUMBS.INACTIVE_COLOR});
      ${COLORS.icon}: var(${EXPORT_VARS.BLACK_ALFA[24]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.label.active}: var(${COLORS_BREADCRUMBS.ACTIVE_COLOR});
      ${COLORS.label.inactive}: var(${COLORS_BREADCRUMBS.INACTIVE_COLOR});
      ${COLORS.icon}: var(${EXPORT_VARS.WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.label.active}: var(${COLORS_BREADCRUMBS.ACTIVE_COLOR});
      ${COLORS.label.inactive}: var(${COLORS_BREADCRUMBS.INACTIVE_COLOR});
      ${COLORS.icon}: var(${EXPORT_VARS.BLACK_ALFA[24]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.label.active}: var(${COLORS_BREADCRUMBS.ACTIVE_COLOR});
      ${COLORS.label.inactive}: var(${COLORS_BREADCRUMBS.INACTIVE_COLOR});
      ${COLORS.icon}: var(${EXPORT_VARS.WHITE_ALFA[24]});
    }
  }
`;
