import { css } from '@linaria/core';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { GREY, BLUE_GREY, PURPLE, GREEN } = EXPORT_VARS;

export const COLORS = {
  FILL: '--color-button-overlay-fill',
  BG: '--color-button-overlay-bg',
  FILL_HOVER: '--color-button-overlay-fill-hover',
  BG_HOVER: '--color-button-overlay-bg-hover',
  FILL_ACTIVE: '--color-button-overlay-fill-active',
  BG_ACTIVE: '--color-button-overlay-bg-active',
  FILL_DISABLED: '--color-button-overlay-fill-disabled',
  BG_DISABLED: '--color-button-overlay-bg-disabled',
};

/* TODO: использовать [data-theme='${Themes.Purple}'] */
export const PURPLE_THEME = css`
  :global() {
    [data-theme='purple'] {
      ${COLORS.FILL}: var(${GREY[300]});
      ${COLORS.BG}: var(${GREY[50]});
      ${COLORS.FILL_HOVER}: var(${PURPLE[100]});
      ${COLORS.BG_HOVER}: var(${GREY[100]});
      ${COLORS.FILL_ACTIVE}: var(${PURPLE[115]});
      ${COLORS.BG_ACTIVE}: var(${GREY[150]});
      ${COLORS.FILL_DISABLED}: var(${GREY[150]});
      ${COLORS.BG_DISABLED}: var(${GREY[50]});
    }
  }
`;

/* TODO: использовать [data-theme='${Themes.PurpleDark}'] */
export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme='purpleDark'] {
      ${COLORS.FILL}: var(${GREY[350]});
      ${COLORS.BG}: var(${GREY[700]});
      ${COLORS.FILL_HOVER}: var(${PURPLE[25]});
      ${COLORS.BG_HOVER}: var(${GREY[650]});
      ${COLORS.FILL_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.BG_ACTIVE}: var(${GREY[750]});
      ${COLORS.FILL_DISABLED}: var(${GREY[650]});
      ${COLORS.BG_DISABLED}: var(${GREY[750]});
    }
  }
`;

/* TODO: использовать [data-theme='${Themes.Green}'] */
export const GREEN_THEME = css`
  :global() {
    [data-theme='green'] {
      ${COLORS.FILL}: var(${GREY[300]});
      ${COLORS.BG}: var(${GREY[50]});
      ${COLORS.FILL_HOVER}: var(${BLUE_GREY[80]});
      ${COLORS.BG_HOVER}: var(${GREY[100]});
      ${COLORS.FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.BG_ACTIVE}: var(${GREY[150]});
      ${COLORS.FILL_DISABLED}: var(${GREY[150]});
      ${COLORS.BG_DISABLED}: var(${GREY[50]});
    }
  }
`;

/* TODO: использовать [data-theme='${Themes.GreenDark}'] */
export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme='greenDark'] {
      ${COLORS.FILL}: var(${GREY[350]});
      ${COLORS.BG}: var(${GREY[700]});
      ${COLORS.FILL_HOVER}: var(${GREEN[50]});
      ${COLORS.BG_HOVER}: var(${GREY[650]});
      ${COLORS.FILL_ACTIVE}: var(${GREEN[100]});
      ${COLORS.BG_ACTIVE}: var(${GREY[750]});
      ${COLORS.FILL_DISABLED}: var(${GREY[650]});
      ${COLORS.BG_DISABLED}: var(${GREY[750]});
    }
  }
`;
