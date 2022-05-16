import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { WHITE_ALFA, BLACK_ALFA, SUNNY_YELLOW, SUNNY_YELLOW_ALPHA } = EXPORT_VARS;

export const COLORS = {
  UNCHECKED: {
    DEFAULT_FILL: '--color-favourite-unchecked-default-fill',
    HOVER_FILL: '--color-favourite-unchecked-hover-fill',
    DISABLED_FILL: '--color-favourite-unchecked-disabled-fill',
  },
  CHECKED: {
    DEFAULT_FILL: '--color-favourite-checked-default-fill',
    HOVER_FILL: '--color-favourite-checked-hover-fill',
    DISABLED_FILL: '--color-favourite-checked-disabled-fill',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.UNCHECKED.DEFAULT_FILL}: var(${BLACK_ALFA[16]});
      ${COLORS.UNCHECKED.HOVER_FILL}: var(${BLACK_ALFA[48]});
      ${COLORS.UNCHECKED.DISABLED_FILL}: var(${BLACK_ALFA[8]});
      ${COLORS.CHECKED.DEFAULT_FILL}: var(${SUNNY_YELLOW[100]});
      ${COLORS.CHECKED.HOVER_FILL}: var(${SUNNY_YELLOW[115]});
      ${COLORS.CHECKED.DISABLED_FILL}: var(${SUNNY_YELLOW_ALPHA[50]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.UNCHECKED.DEFAULT_FILL}: var(${WHITE_ALFA[24]});
      ${COLORS.UNCHECKED.HOVER_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.UNCHECKED.DISABLED_FILL}: var(${WHITE_ALFA[16]});
      ${COLORS.CHECKED.DEFAULT_FILL}: var(${SUNNY_YELLOW[100]});
      ${COLORS.CHECKED.HOVER_FILL}: var(${SUNNY_YELLOW[75]});
      ${COLORS.CHECKED.DISABLED_FILL}: var(${SUNNY_YELLOW_ALPHA[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.UNCHECKED.DEFAULT_FILL}: var(${BLACK_ALFA[16]});
      ${COLORS.UNCHECKED.HOVER_FILL}: var(${BLACK_ALFA[48]});
      ${COLORS.UNCHECKED.DISABLED_FILL}: var(${BLACK_ALFA[8]});
      ${COLORS.CHECKED.DEFAULT_FILL}: var(${SUNNY_YELLOW[100]});
      ${COLORS.CHECKED.HOVER_FILL}: var(${SUNNY_YELLOW[115]});
      ${COLORS.CHECKED.DISABLED_FILL}: var(${SUNNY_YELLOW_ALPHA[50]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.UNCHECKED.DEFAULT_FILL}: var(${WHITE_ALFA[24]});
      ${COLORS.UNCHECKED.HOVER_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.UNCHECKED.DISABLED_FILL}: var(${WHITE_ALFA[16]});
      ${COLORS.CHECKED.DEFAULT_FILL}: var(${SUNNY_YELLOW[100]});
      ${COLORS.CHECKED.HOVER_FILL}: var(${SUNNY_YELLOW[75]});
      ${COLORS.CHECKED.DISABLED_FILL}: var(${SUNNY_YELLOW_ALPHA[50]});
    }
  }
`;
