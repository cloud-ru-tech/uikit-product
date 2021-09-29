import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, BLUE_GREY, PURPLE, WHITE_ALFA, BLACK_ALFA, GREEN } = EXPORT_VARS;

export const COLORS = {
  DEFAULT_FILL: '--color-button-icon-transparent-default-fill',
  DEFAULT_BG: '--color-button-icon-transparent-default-bg',
  DEFAULT_FILL_HOVER: '--color-button-icon-transparent-default-fill-hover',
  DEFAULT_BG_HOVER: '--color-button-icon-transparent-default-bg-hover',
  DEFAULT_FILL_ACTIVE: '--color-button-icon-transparent-default-fill-active',
  DEFAULT_BG_ACTIVE: '--color-button-icon-transparent-default-bg-active',
  DEFAULT_FILL_DISABLED: '--color-button-icon-transparent-default-fill-disabled',
  DEFAULT_BG_DISABLED: '--color-button-icon-transparent-default-bg-disabled',

  ACCENT_FILL: '--color-button-icon-transparent-accent-fill',
  ACCENT_BG: '--color-button-icon-transparent-accent-bg',
  ACCENT_FILL_HOVER: '--color-button-icon-transparent-accent-fill-hover',
  ACCENT_BG_HOVER: '--color-button-icon-transparent-accent-bg-hover',
  ACCENT_FILL_ACTIVE: '--color-button-icon-transparent-accent-fill-active',
  ACCENT_BG_ACTIVE: '--color-button-icon-transparent-accent-bg-active',
  ACCENT_FILL_DISABLED: '--color-button-icon-transparent-accent-fill-disabled',
  ACCENT_BG_DISABLED: '--color-button-icon-transparent-accent-bg-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.DEFAULT_FILL}: var(${GREY[300]});
      ${COLORS.DEFAULT_BG}: var(${BLACK_ALFA[4]});
      ${COLORS.DEFAULT_FILL_HOVER}: var(${BLUE_GREY[60]});
      ${COLORS.DEFAULT_BG_HOVER}: var(${GREY[100]});
      ${COLORS.DEFAULT_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.DEFAULT_BG_ACTIVE}: var(${GREY[150]});
      ${COLORS.DEFAULT_FILL_DISABLED}: var(${GREY[150]});
      ${COLORS.DEFAULT_BG_DISABLED}: var(${GREY[50]});

      ${COLORS.ACCENT_FILL}: var(${PURPLE[25]});
      ${COLORS.ACCENT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${PURPLE[10]});
      ${COLORS.ACCENT_BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ACCENT_BG_ACTIVE}: var(${WHITE_ALFA[24]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_BG_DISABLED}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.DEFAULT_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.DEFAULT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.DEFAULT_FILL_HOVER}: var(${GREY[200]});
      ${COLORS.DEFAULT_BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.DEFAULT_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.DEFAULT_BG_ACTIVE}: var(${WHITE_ALFA[24]});
      ${COLORS.DEFAULT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.DEFAULT_BG_DISABLED}: var(${WHITE_ALFA[8]});

      ${COLORS.ACCENT_FILL}: var(${PURPLE[25]});
      ${COLORS.ACCENT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${PURPLE[10]});
      ${COLORS.ACCENT_BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ACCENT_BG_ACTIVE}: var(${WHITE_ALFA[24]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_BG_DISABLED}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.DEFAULT_FILL}: var(${GREY[300]});
      ${COLORS.DEFAULT_BG}: var(${BLACK_ALFA[4]});
      ${COLORS.DEFAULT_FILL_HOVER}: var(${BLUE_GREY[60]});
      ${COLORS.DEFAULT_BG_HOVER}: var(${GREY[100]});
      ${COLORS.DEFAULT_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.DEFAULT_BG_ACTIVE}: var(${GREY[150]});
      ${COLORS.DEFAULT_FILL_DISABLED}: var(${GREY[150]});
      ${COLORS.DEFAULT_BG_DISABLED}: var(${GREY[50]});

      ${COLORS.ACCENT_FILL}: var(${GREEN[25]});
      ${COLORS.ACCENT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${GREEN[10]});
      ${COLORS.ACCENT_BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ACCENT_BG_ACTIVE}: var(${WHITE_ALFA[24]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_BG_DISABLED}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.DEFAULT_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.DEFAULT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.DEFAULT_FILL_HOVER}: var(${GREY[200]});
      ${COLORS.DEFAULT_BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.DEFAULT_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.DEFAULT_BG_ACTIVE}: var(${WHITE_ALFA[24]});
      ${COLORS.DEFAULT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.DEFAULT_BG_DISABLED}: var(${WHITE_ALFA[8]});

      ${COLORS.ACCENT_FILL}: var(${GREEN[10]});
      ${COLORS.ACCENT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ACCENT_BG_HOVER}: var(${WHITE_ALFA[24]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ACCENT_BG_ACTIVE}: var(${WHITE_ALFA[48]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[48]});
      ${COLORS.ACCENT_BG_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;
