import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY } = EXPORT_VARS;

export const COLORS = {
  TITLE_LIGHT: GREY[900],
  TITLE_DARK: GREY[0],
  BACKGROUND_LIGHT: '#FFF',
  BACKGROUND_DARK: GREY[800],
  LABEL_LIGHT: '#808080',
  LABEL_DARK: '#808080',

  // Values must be valid hex/rgb color strings to build the colorScale.
  RANGE_START_LIGHT: '#F2F2F2',
  RANGE_START_DARK: '#404040',
  RANGE_END_PURPLE_LIGHT: '#5558FA',
  RANGE_END_PURPLE_DARK: '#5558FA',
  RANGE_END_GREEN_LIGHT: '#157552',
  RANGE_END_GREEN_DARK: '#157552',
};

export const COLOR_VARS = {
  TITLE: '--color-heat-map-chart-title',
  BACKGROUND: '--color-heat-map-chart-background',
  LABEL: '--color-heat-map-chart-label',
  RANGE_START: '--color-heat-map-chart-range-start',
  RANGE_END: '--color-heat-map-chart-range-end',
  VALUE: '--color-heat-map-chart-value',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLOR_VARS.TITLE}: ${COLORS.TITLE_LIGHT};
      ${COLOR_VARS.BACKGROUND}: ${COLORS.BACKGROUND_LIGHT};
      ${COLOR_VARS.LABEL}: ${COLORS.LABEL_LIGHT};
      ${COLOR_VARS.RANGE_START}: ${COLORS.RANGE_START_LIGHT};
      ${COLOR_VARS.RANGE_END}: ${COLORS.RANGE_END_PURPLE_LIGHT};
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLOR_VARS.TITLE}: ${COLORS.TITLE_LIGHT};
      ${COLOR_VARS.BACKGROUND}: ${COLORS.BACKGROUND_LIGHT};
      ${COLOR_VARS.LABEL}: ${COLORS.LABEL_LIGHT};
      ${COLOR_VARS.RANGE_START}: ${COLORS.RANGE_START_LIGHT};
      ${COLOR_VARS.RANGE_END}: ${COLORS.RANGE_END_GREEN_LIGHT};
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLOR_VARS.TITLE}: ${COLORS.TITLE_DARK};
      ${COLOR_VARS.BACKGROUND}: ${COLORS.BACKGROUND_DARK};
      ${COLOR_VARS.LABEL}: ${COLORS.LABEL_DARK};
      ${COLOR_VARS.RANGE_START}: ${COLORS.RANGE_START_DARK};
      ${COLOR_VARS.RANGE_END}: ${COLORS.RANGE_END_PURPLE_DARK};
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLOR_VARS.TITLE}: ${COLORS.TITLE_DARK};
      ${COLOR_VARS.BACKGROUND}: ${COLORS.BACKGROUND_DARK};
      ${COLOR_VARS.LABEL}: ${COLORS.LABEL_DARK};
      ${COLOR_VARS.RANGE_START}: ${COLORS.RANGE_START_DARK};
      ${COLOR_VARS.RANGE_END}: ${COLORS.RANGE_END_GREEN_DARK};
    }
  }
`;
