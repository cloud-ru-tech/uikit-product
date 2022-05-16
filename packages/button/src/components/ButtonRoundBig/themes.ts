import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLUE_GREY, PURPLE, GREEN, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  FILL: '--color-button-round-big-fill',
  BG: '--color-button-round-big-bg',
  COLOR: '--color-button-round-big-color',
  FILL_HOVER: '--color-button-round-big-fill-hover',
  BG_HOVER: '--color-button-round-big-bg-hover',
  COLOR_HOVER: '--color-button-round-big-color-hover',
  FILL_ACTIVE: '--color-button-round-big-fill-active',
  BG_ACTIVE: '--color-button-round-big-bg-active',
  COLOR_ACTIVE: '--color-button-round-big-color-active',
  FILL_DISABLED: '--color-button-round-big-fill-disabled',
  BG_DISABLED: '--color-button-round-big-bg-disabled',
  COLOR_DISABLED: '--color-button-round-big-color-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.FILL}: var(${PURPLE[100]});
      ${COLORS.BG}: var(${PURPLE[5]});
      ${COLORS.COLOR}: var(${PURPLE[100]});
      ${COLORS.FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.BG_HOVER}: var(${PURPLE[10]});
      ${COLORS.COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.BG_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.FILL_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.BG_DISABLED}: var(${BLACK_ALFA[4]});
      ${COLORS.COLOR_DISABLED}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.FILL}: var(${PURPLE[50]});
      ${COLORS.BG}: var(${WHITE_ALFA[8]});
      ${COLORS.COLOR}: var(${PURPLE[50]});
      ${COLORS.FILL_HOVER}: var(${GREY[0]});
      ${COLORS.BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILL_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.BG_ACTIVE}: var(${WHITE_ALFA[16]});
      ${COLORS.COLOR_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.BG_DISABLED}: var(${WHITE_ALFA[4]});
      ${COLORS.COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.FILL}: var(${BLUE_GREY[80]});
      ${COLORS.BG}: var(${GREY[25]});
      ${COLORS.COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.BG_HOVER}: var(${GREY[50]});
      ${COLORS.COLOR_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.BG_ACTIVE}: var(${GREY[100]});
      ${COLORS.COLOR_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.FILL_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.BG_DISABLED}: var(${BLACK_ALFA[4]});
      ${COLORS.COLOR_DISABLED}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.FILL}: var(${GREEN[100]});
      ${COLORS.BG}: var(${WHITE_ALFA[8]});
      ${COLORS.COLOR}: var(${GREEN[100]});
      ${COLORS.FILL_HOVER}: var(${GREY[0]});
      ${COLORS.BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILL_ACTIVE}: var(${GREEN[50]});
      ${COLORS.BG_ACTIVE}: var(${WHITE_ALFA[16]});
      ${COLORS.COLOR_ACTIVE}: var(${GREEN[50]});
      ${COLORS.FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.BG_DISABLED}: var(${WHITE_ALFA[4]});
      ${COLORS.COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;
