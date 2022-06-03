import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, PURPLE, WHITE_ALFA, PURPLE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: '--color-table-no-rows__background',
  icon: {
    background: '--color-table-no-rows__icon__background',
    fill: '--color-table-no-rows__icon__fill',
  },
  title: '--color-table-no-rows__title',
  description: '--color-table-no-rows__description',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.icon.background}: var(${PURPLE_ALFA[8]});
      ${COLORS.icon.fill}: var(${PURPLE[100]});
      ${COLORS.title}: var(${GREY[800]});
      ${COLORS.description}: var(${GREY[600]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.icon.background}: var(${BLACK_ALFA[4]});
      ${COLORS.icon.fill}: var(${BLACK_ALFA[24]});
      ${COLORS.title}: var(${GREY[800]});
      ${COLORS.description}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background}: var(${WHITE_ALFA[4]});
      ${COLORS.icon.background}: var(${PURPLE_ALFA[24]});
      ${COLORS.icon.fill}: var(${PURPLE[50]});
      ${COLORS.title}: var(${GREY[100]});
      ${COLORS.description}: var(${GREY[300]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background}: var(${WHITE_ALFA[4]});
      ${COLORS.icon.background}: var(${WHITE_ALFA[8]});
      ${COLORS.icon.fill}: var(${WHITE_ALFA[48]});
      ${COLORS.title}: var(${GREY[100]});
      ${COLORS.description}: var(${GREY[300]});
    }
  }
`;
