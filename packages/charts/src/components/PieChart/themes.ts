import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY } = EXPORT_VARS;

export const COLORS = {
  BACKGROUND: '--color-pie-chart-background',
  LEGEND_TITLE: '--color-pie-chart-legend-title',
  LEGEND_ITEM: '--color-pie-chart-legend-item',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.BACKGROUND}: var(${GREY[0]});
      ${COLORS.LEGEND_TITLE}: var(${GREY[350]});
      ${COLORS.LEGEND_ITEM}: var(${GREY[900]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.BACKGROUND}: var(${GREY[0]});
      ${COLORS.LEGEND_TITLE}: var(${GREY[350]});
      ${COLORS.LEGEND_ITEM}: var(${GREY[900]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.BACKGROUND}: var(${GREY[800]});
      ${COLORS.LEGEND_TITLE}: var(${GREY[500]});
      ${COLORS.LEGEND_ITEM}: var(${GREY[0]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.BACKGROUND}: var(${GREY[800]});
      ${COLORS.LEGEND_TITLE}: var(${GREY[500]});
      ${COLORS.LEGEND_ITEM}: var(${GREY[0]});
    }
  }
`;
