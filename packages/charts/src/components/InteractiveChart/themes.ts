import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { BLACK_ALFA, WHITE_ALFA, GREY } = EXPORT_VARS;

export const COLORS = {
  BACKGROUND: '--color-interactive-chart-background',
  CURSOR: '--color-interactive-chart-cursor',
  SELECTED_AREA: '--color-interactive-chart-selected-area',
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme=${Themes.Purple}] {
      ${COLORS.BACKGROUND}: var(${GREY[0]});
      ${COLORS.CURSOR}: var(${GREY[250]});
      ${COLORS.SELECTED_AREA}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme=${Themes.Green}] {
      ${COLORS.BACKGROUND}: var(${GREY[0]});
      ${COLORS.CURSOR}: var(${GREY[250]});
      ${COLORS.SELECTED_AREA}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.PurpleDark}] {
      ${COLORS.BACKGROUND}: var(${GREY[800]});
      ${COLORS.CURSOR}: var(${GREY[250]});
      ${COLORS.SELECTED_AREA}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.GreenDark}] {
      ${COLORS.BACKGROUND}: var(${GREY[800]});
      ${COLORS.CURSOR}: var(${GREY[250]});
      ${COLORS.SELECTED_AREA}: var(${WHITE_ALFA[8]});
    }
  }
`;
