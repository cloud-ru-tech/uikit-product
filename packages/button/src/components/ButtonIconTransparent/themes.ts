import { css } from '@linaria/core';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { GREY, BLUE_GREY, PURPLE, WHITE_ALFA, GREEN } = EXPORT_VARS;

export const COLORS = {
  DEFAULT_FILL: '--color-button-icon-default-fill',
  DEFAULT_BG: '--color-button-icon-default-bg',
  DEFAULT_FILL_HOVER: '--color-button-icon-default-fill-hover',
  DEFAULT_BG_HOVER: '--color-button-icon-default-bg-hover',
  DEFAULT_FILL_ACTIVE: '--color-button-icon-default-fill-active',
  DEFAULT_BG_ACTIVE: '--color-button-icon-default-bg-active',
  DEFAULT_FILL_DISABLED: '--color-button-icon-default-fill-disabled',
  DEFAULT_BG_DISABLED: '--color-button-icon-default-bg-disabled',

  ACCENT_FILL: '--color-button-icon-accent-fill',
  ACCENT_BG: '--color-button-icon-accent-bg',
  ACCENT_FILL_HOVER: '--color-button-icon-accent-fill-hover',
  ACCENT_BG_HOVER: '--color-button-icon-accent-bg-hover',
  ACCENT_FILL_ACTIVE: '--color-button-icon-accent-fill-active',
  ACCENT_BG_ACTIVE: '--color-button-icon-accent-bg-active',
  ACCENT_FILL_DISABLED: '--color-button-icon-accent-fill-disabled',
  ACCENT_BG_DISABLED: '--color-button-icon-accent-bg-disabled',
};

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.Purple}'] */
export const PURPLE_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='purple'] {
      ${COLORS.DEFAULT_FILL}: var(${GREY[300]});
      ${COLORS.DEFAULT_BG}: var(${WHITE_ALFA[48]});
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

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.PurpleDark}'] */
export const PURPLE_DARK_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='purpleDark'] {
      ${COLORS.DEFAULT_FILL}: var(${GREY[450]});
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

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.Green}'] */
export const GREEN_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='green'] {
      ${COLORS.DEFAULT_FILL}: var(${GREY[300]});
      ${COLORS.DEFAULT_BG}: var(${WHITE_ALFA[48]});
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

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.GreenDark}'] */
export const GREEN_DARK_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='greenDark'] {
      ${COLORS.DEFAULT_FILL}: var(${GREY[450]});
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
