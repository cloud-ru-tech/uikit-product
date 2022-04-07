import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, BLUE_GREY, PURPLE, GREEN, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  BG: '--color-button-toolbar-bg',
  FILL: '--color-button-toolbar-fill',
  FILL_HOVER: '--color-button-toolbar-fill-hover',
  FILL_ACTIVE: '--color-button-toolbar-fill-active',
  FILL_DISABLED: '--color-button-toolbar-fill-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.BG}: var(${GREY[0]});
      ${COLORS.FILL}: var(${BLACK_ALFA[16]});
      ${COLORS.FILL_HOVER}: var(${PURPLE[100]});
      ${COLORS.FILL_ACTIVE}: var(${PURPLE[115]});
      ${COLORS.FILL_DISABLED}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.BG}: var(${GREY[850]});
      ${COLORS.FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.FILL_HOVER}: var(${GREY[0]});
      ${COLORS.FILL_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.FILL_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.BG}: var(${GREY[0]});
      ${COLORS.FILL}: var(${BLACK_ALFA[16]});
      ${COLORS.FILL_HOVER}: var(${BLUE_GREY[50]});
      ${COLORS.FILL_ACTIVE}: var(${BLUE_GREY[90]});
      ${COLORS.FILL_DISABLED}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.BG}: var(${GREY[850]});
      ${COLORS.FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.FILL_HOVER}: var(${GREY[0]});
      ${COLORS.FILL_ACTIVE}: var(${GREEN[25]});
      ${COLORS.FILL_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;
