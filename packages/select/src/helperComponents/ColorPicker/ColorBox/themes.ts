import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const COLORS = {
  background: {
    green: '--color-color-picker__color-box-background__green',
    blue: '--color-color-picker__color-box-background__blue',
    purple: '--color-color-picker__color-box-background__purple',
    pink: '--color-color-picker__color-box-background__pink',
    red: '--color-color-picker__color-box-background__red',
    brown: '--color-color-picker__color-box-background__brown',
    orange: '--color-color-picker__color-box-background__orange',
    yellow: '--color-color-picker__color-box-background__yellow',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background.green}: var(${EXPORT_VARS.PRESET.GREEN_LIGHT});
      ${COLORS.background.blue}: var(${EXPORT_VARS.PRESET.BLUE_LIGHT});
      ${COLORS.background.purple}: var(${EXPORT_VARS.PRESET.VIOLET_LIGHT});
      ${COLORS.background.pink}: var(${EXPORT_VARS.PRESET.PINK_LIGHT});
      ${COLORS.background.red}: var(${EXPORT_VARS.PRESET.RED_LIGHT});
      ${COLORS.background.brown}: var(${EXPORT_VARS.PRESET.BROWN_LIGHT});
      ${COLORS.background.orange}: var(${EXPORT_VARS.PRESET.ORANGE_LIGHT});
      ${COLORS.background.yellow}: var(${EXPORT_VARS.PRESET.YELLOW_LIGHT});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background.green}: var(${EXPORT_VARS.PRESET.GREEN_DARK});
      ${COLORS.background.blue}: var(${EXPORT_VARS.PRESET.BLUE_DARK});
      ${COLORS.background.purple}: var(${EXPORT_VARS.PRESET.VIOLET_DARK});
      ${COLORS.background.pink}: var(${EXPORT_VARS.PRESET.PINK_DARK});
      ${COLORS.background.red}: var(${EXPORT_VARS.PRESET.RED_DARK});
      ${COLORS.background.brown}: var(${EXPORT_VARS.PRESET.BROWN_DARK});
      ${COLORS.background.orange}: var(${EXPORT_VARS.PRESET.ORANGE_DARK});
      ${COLORS.background.yellow}: var(${EXPORT_VARS.PRESET.YELLOW_DARK});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background.green}: var(${EXPORT_VARS.PRESET.GREEN_LIGHT});
      ${COLORS.background.blue}: var(${EXPORT_VARS.PRESET.BLUE_LIGHT});
      ${COLORS.background.purple}: var(${EXPORT_VARS.PRESET.VIOLET_LIGHT});
      ${COLORS.background.pink}: var(${EXPORT_VARS.PRESET.PINK_LIGHT});
      ${COLORS.background.red}: var(${EXPORT_VARS.PRESET.RED_LIGHT});
      ${COLORS.background.brown}: var(${EXPORT_VARS.PRESET.BROWN_LIGHT});
      ${COLORS.background.orange}: var(${EXPORT_VARS.PRESET.ORANGE_LIGHT});
      ${COLORS.background.yellow}: var(${EXPORT_VARS.PRESET.YELLOW_LIGHT});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background.green}: var(${EXPORT_VARS.PRESET.GREEN_DARK});
      ${COLORS.background.blue}: var(${EXPORT_VARS.PRESET.BLUE_DARK});
      ${COLORS.background.purple}: var(${EXPORT_VARS.PRESET.VIOLET_DARK});
      ${COLORS.background.pink}: var(${EXPORT_VARS.PRESET.PINK_DARK});
      ${COLORS.background.red}: var(${EXPORT_VARS.PRESET.RED_DARK});
      ${COLORS.background.brown}: var(${EXPORT_VARS.PRESET.BROWN_DARK});
      ${COLORS.background.orange}: var(${EXPORT_VARS.PRESET.ORANGE_DARK});
      ${COLORS.background.yellow}: var(${EXPORT_VARS.PRESET.YELLOW_DARK});
    }
  }
`;
