import { css } from '@linaria/core';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { GREY, BLUE_GREY, PURPLE, GREEN, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  FILL: '--color-button-table-icon-fill',
  BG: '--color-button-table-icon-bg',
  FILL_HOVER: '--color-button-table-icon-fill-hover',
  BG_HOVER: '--color-button-table-icon-bg-hover',
  FILL_ACTIVE: '--color-button-table-icon-fill-active',
  BG_ACTIVE: '--color-button-table-icon-bg-active',
  FILL_CONNECTING: '--color-button-table-icon-fill-connecting',
  BG_CONNECTING: '--color-button-table-icon-bg-connecting',
  FILL_DISABLED: '--color-button-table-icon-fill-disabled',
  BG_DISABLED: '--color-button-table-icon-bg-disabled',
};

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.Purple}'] */
export const PURPLE_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='purple'] {
      ${COLORS.FILL}: var(${GREY[0]});
      ${COLORS.BG}: var(${GREY[450]});
      ${COLORS.FILL_HOVER}: var(${GREY[0]});
      ${COLORS.BG_HOVER}: var(${PURPLE[100]});
      ${COLORS.FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.BG_ACTIVE}: var(${PURPLE[115]});
      ${COLORS.FILL_CONNECTING}: var(${GREY[0]});
      ${COLORS.BG_CONNECTING}: var(${PURPLE[125]});
      ${COLORS.FILL_DISABLED}: var(${GREY[0]});
      ${COLORS.BG_DISABLED}: var(${GREY[200]});
    }
  }
`;

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.PurpleDark}'] */
export const PURPLE_DARK_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='purpleDark'] {
      ${COLORS.FILL}: var(${GREY[0]});
      ${COLORS.BG}: var(${GREY[450]});
      ${COLORS.FILL_HOVER}: var(${GREY[0]});
      ${COLORS.BG_HOVER}: var(${PURPLE[100]});
      ${COLORS.FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.BG_ACTIVE}: var(${PURPLE[115]});
      ${COLORS.FILL_CONNECTING}: var(${GREY[0]});
      ${COLORS.BG_CONNECTING}: var(${PURPLE[125]});
      ${COLORS.FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.BG_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.Green}'] */
export const GREEN_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='green'] {
      ${COLORS.FILL}: var(${GREY[0]});
      ${COLORS.BG}: var(${GREY[450]});
      ${COLORS.FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.BG_HOVER}: var(${GREEN[100]});
      ${COLORS.FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.BG_ACTIVE}: var(${GREEN[115]});
      ${COLORS.FILL_CONNECTING}: var(${BLUE_GREY[100]});
      ${COLORS.BG_CONNECTING}: var(${GREEN[125]});
      ${COLORS.FILL_DISABLED}: var(${GREY[0]});
      ${COLORS.BG_DISABLED}: var(${GREY[200]});
    }
  }
`;

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.GreenDark}'] */
export const GREEN_DARK_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='greenDark'] {
      ${COLORS.FILL}: var(${GREY[0]});
      ${COLORS.BG}: var(${GREY[450]});
      ${COLORS.FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.BG_HOVER}: var(${GREEN[100]});
      ${COLORS.FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.BG_ACTIVE}: var(${GREEN[115]});
      ${COLORS.FILL_CONNECTING}: var(${BLUE_GREY[100]});
      ${COLORS.BG_CONNECTING}: var(${GREEN[125]});
      ${COLORS.FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.BG_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;
