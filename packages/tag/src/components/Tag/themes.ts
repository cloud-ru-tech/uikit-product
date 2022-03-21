import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const COLORS = {
  text: {
    default: '--color-tag__text__default',
  },
  background: {
    green: '--color-tag__background__green',
    blue: '--color-tag__background__blue',
    purple: '--color-tag__background__purple',
    pink: '--color-tag__background__pink',
    red: '--color-tag__background__red',
    gray: '--color-tag__background__gray',
    brown: '--color-tag__background__brown',
    orange: '--color-tag__background__orange',
    yellow: '--color-tag__background__yellow',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.green}: var(${EXPORT_VARS.PRESET.GREEN_LIGHT});
      ${COLORS.background.blue}: var(${EXPORT_VARS.PRESET.BLUE_LIGHT});
      ${COLORS.background.purple}: var(${EXPORT_VARS.PRESET.VIOLET_LIGHT});
      ${COLORS.background.pink}: var(${EXPORT_VARS.PRESET.PINK_LIGHT});
      ${COLORS.background.red}: var(${EXPORT_VARS.PRESET.RED_LIGHT});
      ${COLORS.background.gray}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.background.brown}: var(${EXPORT_VARS.PRESET.BROWN_LIGHT});
      ${COLORS.background.orange}: var(${EXPORT_VARS.PRESET.ORANGE_LIGHT});
      ${COLORS.background.yellow}: var(${EXPORT_VARS.PRESET.YELLOW_LIGHT});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.background.green}: var(${EXPORT_VARS.PRESET.GREEN_DARK});
      ${COLORS.background.blue}: var(${EXPORT_VARS.PRESET.BLUE_DARK});
      ${COLORS.background.purple}: var(${EXPORT_VARS.PRESET.VIOLET_DARK});
      ${COLORS.background.pink}: var(${EXPORT_VARS.PRESET.PINK_DARK});
      ${COLORS.background.red}: var(${EXPORT_VARS.PRESET.RED_DARK});
      ${COLORS.background.gray}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.background.brown}: var(${EXPORT_VARS.PRESET.BROWN_DARK});
      ${COLORS.background.orange}: var(${EXPORT_VARS.PRESET.ORANGE_DARK});
      ${COLORS.background.yellow}: var(${EXPORT_VARS.PRESET.YELLOW_DARK});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.background.green}: var(${EXPORT_VARS.PRESET.GREEN_LIGHT});
      ${COLORS.background.blue}: var(${EXPORT_VARS.PRESET.BLUE_LIGHT});
      ${COLORS.background.purple}: var(${EXPORT_VARS.PRESET.VIOLET_LIGHT});
      ${COLORS.background.pink}: var(${EXPORT_VARS.PRESET.PINK_LIGHT});
      ${COLORS.background.red}: var(${EXPORT_VARS.PRESET.RED_LIGHT});
      ${COLORS.background.gray}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.background.brown}: var(${EXPORT_VARS.PRESET.BROWN_LIGHT});
      ${COLORS.background.orange}: var(${EXPORT_VARS.PRESET.ORANGE_LIGHT});
      ${COLORS.background.yellow}: var(${EXPORT_VARS.PRESET.YELLOW_LIGHT});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.background.green}: var(${EXPORT_VARS.PRESET.GREEN_DARK});
      ${COLORS.background.blue}: var(${EXPORT_VARS.PRESET.BLUE_DARK});
      ${COLORS.background.purple}: var(${EXPORT_VARS.PRESET.VIOLET_DARK});
      ${COLORS.background.pink}: var(${EXPORT_VARS.PRESET.PINK_DARK});
      ${COLORS.background.red}: var(${EXPORT_VARS.PRESET.RED_DARK});
      ${COLORS.background.gray}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.background.brown}: var(${EXPORT_VARS.PRESET.BROWN_DARK});
      ${COLORS.background.orange}: var(${EXPORT_VARS.PRESET.ORANGE_DARK});
      ${COLORS.background.yellow}: var(${EXPORT_VARS.PRESET.YELLOW_DARK});
    }
  }
`;
