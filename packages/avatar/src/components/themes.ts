import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLUE_GREY, PRESET, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  text: '--color-avatar__text',
  hover: '--color-avatar__hover',
  icon: '--color-avatar__icon',
  background: {
    red: '--color-avatar__background__red',
    pink: '--color-avatar__background__pink',
    violet: '--color-avatar__background__violet',
    blue: '--color-avatar__background__blue',
    green: '--color-avatar__background__green',
    yellow: '--color-avatar__background__yellow',
    orange: '--color-avatar__background__orange',
    brown: '--color-avatar__background__brown',
    silver_gray: '--color-avatar__background__gray',
    grass: '--color-avatar__background__grass',
    seamount: '--color-avatar__background__seamount',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.text}: var(${BLUE_GREY[100]});
      ${COLORS.hover}: var(${BLACK_ALFA[8]});
      ${COLORS.icon}: var(${BLACK_ALFA[16]});
      ${COLORS.background.red}: var(${PRESET.RED_LIGHT});
      ${COLORS.background.pink}: var(${PRESET.PINK_LIGHT});
      ${COLORS.background.violet}: var(${PRESET.VIOLET_LIGHT});
      ${COLORS.background.blue}: var(${PRESET.BLUE_LIGHT});
      ${COLORS.background.green}: var(${PRESET.GREEN_LIGHT});
      ${COLORS.background.yellow}: var(${PRESET.YELLOW_LIGHT});
      ${COLORS.background.orange}: var(${PRESET.ORANGE_LIGHT});
      ${COLORS.background.brown}: var(${PRESET.BROWN_LIGHT});
      ${COLORS.background.silver_gray}: var(${PRESET.SILVER_GRAY_LIGHT});
      ${COLORS.background.grass}: var(${PRESET.GRASS_LIGHT});
      ${COLORS.background.seamount}: var(${PRESET.SEAMOUNT_LIGHT});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.text}: var(${GREY[0]});
      ${COLORS.hover}: var(${WHITE_ALFA[16]});
      ${COLORS.icon}: var(${WHITE_ALFA[24]});
      ${COLORS.background.red}: var(${PRESET.RED_DARK});
      ${COLORS.background.pink}: var(${PRESET.PINK_DARK});
      ${COLORS.background.violet}: var(${PRESET.VIOLET_DARK});
      ${COLORS.background.blue}: var(${PRESET.BLUE_DARK});
      ${COLORS.background.green}: var(${PRESET.GREEN_DARK});
      ${COLORS.background.yellow}: var(${PRESET.YELLOW_DARK});
      ${COLORS.background.orange}: var(${PRESET.ORANGE_DARK});
      ${COLORS.background.brown}: var(${PRESET.BROWN_DARK});
      ${COLORS.background.silver_gray}: var(${PRESET.SILVER_GRAY_DARK});
      ${COLORS.background.grass}: var(${PRESET.GRASS_DARK});
      ${COLORS.background.seamount}: var(${PRESET.SEAMOUNT_DARK});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.text}: var(${BLUE_GREY[100]});
      ${COLORS.hover}: var(${BLACK_ALFA[8]});
      ${COLORS.icon}: var(${BLACK_ALFA[16]});
      ${COLORS.background.red}: var(${PRESET.RED_LIGHT});
      ${COLORS.background.pink}: var(${PRESET.PINK_LIGHT});
      ${COLORS.background.violet}: var(${PRESET.VIOLET_LIGHT});
      ${COLORS.background.blue}: var(${PRESET.BLUE_LIGHT});
      ${COLORS.background.green}: var(${PRESET.GREEN_LIGHT});
      ${COLORS.background.yellow}: var(${PRESET.YELLOW_LIGHT});
      ${COLORS.background.orange}: var(${PRESET.ORANGE_LIGHT});
      ${COLORS.background.brown}: var(${PRESET.BROWN_LIGHT});
      ${COLORS.background.silver_gray}: var(${PRESET.SILVER_GRAY_LIGHT});
      ${COLORS.background.grass}: var(${PRESET.GRASS_LIGHT});
      ${COLORS.background.seamount}: var(${PRESET.SEAMOUNT_LIGHT});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.text}: var(${GREY[0]});
      ${COLORS.hover}: var(${WHITE_ALFA[16]});
      ${COLORS.icon}: var(${WHITE_ALFA[24]});
      ${COLORS.background.red}: var(${PRESET.RED_DARK});
      ${COLORS.background.pink}: var(${PRESET.PINK_DARK});
      ${COLORS.background.violet}: var(${PRESET.VIOLET_DARK});
      ${COLORS.background.blue}: var(${PRESET.BLUE_DARK});
      ${COLORS.background.green}: var(${PRESET.GREEN_DARK});
      ${COLORS.background.yellow}: var(${PRESET.YELLOW_DARK});
      ${COLORS.background.orange}: var(${PRESET.ORANGE_DARK});
      ${COLORS.background.brown}: var(${PRESET.BROWN_DARK});
      ${COLORS.background.silver_gray}: var(${PRESET.SILVER_GRAY_DARK});
      ${COLORS.background.grass}: var(${PRESET.GRASS_DARK});
      ${COLORS.background.seamount}: var(${PRESET.SEAMOUNT_DARK});
    }
  }
`;
