import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLUE_GREY, PURPLE, GREEN, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  FILL_FILL: '--color-button-table-fill-fill',
  FILL_BG: '--color-button-table-fill-bg',
  FILL_COLOR: '--color-button-table-fill-color',
  FILL_FILL_HOVER: '--color-button-table-fill-fill-hover',
  FILL_BG_HOVER: '--color-button-table-fill-bg-hover',
  FILL_COLOR_HOVER: '--color-button-table-fill-color-hover',
  FILL_FILL_ACTIVE: '--color-button-table-fill-fill-active',
  FILL_BG_ACTIVE: '--color-button-table-fill-bg-active',
  FILL_COLOR_ACTIVE: '--color-button-table-fill-color-active',
  FILL_FILL_LOADING: '--color-button-table-fill-fill-loading',
  FILL_BG_LOADING: '--color-button-table-fill-bg-loading',
  FILL_COLOR_LOADING: '--color-button-table-fill-color-loading',
  FILL_FILL_DISABLED: '--color-button-table-fill-fill-disabled',
  FILL_BG_DISABLED: '--color-button-table-fill-bg-disabled',
  FILL_COLOR_DISABLED: '--color-button-table-fill-color-disabled',

  ON_ACCENT_FILL: '--color-button-table-on-accent-fill',
  ON_ACCENT_BG: '--color-button-table-on-accent-bg',
  ON_ACCENT_COLOR: '--color-button-table-on-accent-color',
  ON_ACCENT_FILL_HOVER: '--color-button-table-on-accent-fill-hover',
  ON_ACCENT_BG_HOVER: '--color-button-table-on-accent-bg-hover',
  ON_ACCENT_COLOR_HOVER: '--color-button-table-on-accent-color-hover',
  ON_ACCENT_FILL_ACTIVE: '--color-button-table-on-accent-fill-active',
  ON_ACCENT_BG_ACTIVE: '--color-button-table-on-accent-bg-active',
  ON_ACCENT_COLOR_ACTIVE: '--color-button-table-on-accent-color-active',
  ON_ACCENT_FILL_LOADING: '--color-button-table-on-accent-fill-loading',
  ON_ACCENT_BG_LOADING: '--color-button-table-on-accent-bg-loading',
  ON_ACCENT_COLOR_LOADING: '--color-button-table-on-accent-color-loading',
  ON_ACCENT_FILL_DISABLED: '--color-button-table-on-accent-fill-disabled',
  ON_ACCENT_BG_DISABLED: '--color-button-table-on-accent-bg-disabled',
  ON_ACCENT_COLOR_DISABLED: '--color-button-table-on-accent-color-disabled',

  OUTLINE_FILL: '--color-button-table-outline-fill',
  OUTLINE_BORDER: '--color-button-table-outline-border',
  OUTLINE_COLOR: '--color-button-table-outline-color',
  OUTLINE_FILL_HOVER: '--color-button-table-outline-fill-hover',
  OUTLINE_BORDER_HOVER: '--color-button-table-outline-border-hover',
  OUTLINE_COLOR_HOVER: '--color-button-table-outline-color-hover',
  OUTLINE_FILL_ACTIVE: '--color-button-table-outline-fill-active',
  OUTLINE_BORDER_ACTIVE: '--color-button-table-outline-border-active',
  OUTLINE_COLOR_ACTIVE: '--color-button-table-outline-color-active',
  OUTLINE_FILL_LOADING: '--color-button-table-outline-fill-loading',
  OUTLINE_BG_LOADING: '--color-button-table-outline-bg-loading',
  OUTLINE_COLOR_LOADING: '--color-button-table-outline-color-loading',
  OUTLINE_FILL_DISABLED: '--color-button-table-outline-fill-disabled',
  OUTLINE_BORDER_DISABLED: '--color-button-table-outline-border-disabled',
  OUTLINE_COLOR_DISABLED: '--color-button-table-outline-color-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.FILL_FILL}: var(${GREY[0]});
      ${COLORS.FILL_BG}: var(${PURPLE[100]});
      ${COLORS.FILL_COLOR}: var(${GREY[0]});
      ${COLORS.FILL_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.FILL_BG_HOVER}: var(${PURPLE[115]});
      ${COLORS.FILL_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILL_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILL_BG_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.FILL_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILL_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.FILL_BG_LOADING}: var(${BLUE_GREY[90]});
      ${COLORS.FILL_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.FILL_FILL_DISABLED}: var(${GREY[0]});
      ${COLORS.FILL_BG_DISABLED}: var(${PURPLE[50]});
      ${COLORS.FILL_COLOR_DISABLED}: var(${GREY[0]});

      ${COLORS.ON_ACCENT_FILL}: var(${PURPLE[100]});
      ${COLORS.ON_ACCENT_BG}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR}: var(${PURPLE[100]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.ON_ACCENT_BG_HOVER}: var(${PURPLE[10]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ON_ACCENT_BG_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ON_ACCENT_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_BG_LOADING}: var(${BLUE_GREY[90]});
      ${COLORS.ON_ACCENT_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.OUTLINE_FILL}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_BORDER}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_COLOR}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_BORDER_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_BORDER_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.OUTLINE_BG_LOADING}: var(${BLUE_GREY[90]});
      ${COLORS.OUTLINE_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_DISABLED}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_BORDER_DISABLED}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_COLOR_DISABLED}: var(${PURPLE[50]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.FILL_FILL}: var(${GREY[0]});
      ${COLORS.FILL_BG}: var(${PURPLE[100]});
      ${COLORS.FILL_COLOR}: var(${GREY[0]});
      ${COLORS.FILL_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.FILL_BG_HOVER}: var(${PURPLE[115]});
      ${COLORS.FILL_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILL_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILL_BG_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.FILL_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILL_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.FILL_BG_LOADING}: var(${BLUE_GREY[60]});
      ${COLORS.FILL_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.FILL_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.FILL_BG_DISABLED}: var(${PURPLE[50]});
      ${COLORS.FILL_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.ON_ACCENT_FILL}: var(${PURPLE[100]});
      ${COLORS.ON_ACCENT_BG}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR}: var(${PURPLE[100]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.ON_ACCENT_BG_HOVER}: var(${PURPLE[10]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ON_ACCENT_BG_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ON_ACCENT_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_BG_LOADING}: var(${BLUE_GREY[60]});
      ${COLORS.ON_ACCENT_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.OUTLINE_FILL}: var(${GREY[0]});
      ${COLORS.OUTLINE_BORDER}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_COLOR}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.OUTLINE_BORDER_HOVER}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_BORDER_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_COLOR_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.OUTLINE_BG_LOADING}: var(${BLUE_GREY[60]});
      ${COLORS.OUTLINE_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_BORDER_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.FILL_FILL}: var(${GREEN[100]});
      ${COLORS.FILL_BG}: var(${BLUE_GREY[80]});
      ${COLORS.FILL_COLOR}: var(${GREY[0]});
      ${COLORS.FILL_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.FILL_BG_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.FILL_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILL_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.FILL_BG_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.FILL_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILL_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.FILL_BG_LOADING}: var(${BLUE_GREY[90]});
      ${COLORS.FILL_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.FILL_FILL_DISABLED}: var(${GREY[300]});
      ${COLORS.FILL_BG_DISABLED}: var(${GREY[100]});
      ${COLORS.FILL_COLOR_DISABLED}: var(${GREY[300]});

      ${COLORS.ON_ACCENT_FILL}: var(${BLUE_GREY[80]});
      ${COLORS.ON_ACCENT_BG}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.ON_ACCENT_BG_HOVER}: var(${GREEN[115]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.ON_ACCENT_BG_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.ON_ACCENT_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_BG_LOADING}: var(${WHITE_ALFA[8]});
      ${COLORS.ON_ACCENT_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.OUTLINE_FILL}: var(${GREEN[100]});
      ${COLORS.OUTLINE_BORDER}: var(${GREEN[100]});
      ${COLORS.OUTLINE_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.OUTLINE_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.OUTLINE_BG_LOADING}: var(${BLUE_GREY[90]});
      ${COLORS.OUTLINE_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_DISABLED}: var(${GREY[200]});
      ${COLORS.OUTLINE_BORDER_DISABLED}: var(${GREY[200]});
      ${COLORS.OUTLINE_COLOR_DISABLED}: var(${GREY[200]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.FILL_FILL}: var(${BLUE_GREY[80]});
      ${COLORS.FILL_BG}: var(${GREEN[100]});
      ${COLORS.FILL_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.FILL_FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.FILL_BG_HOVER}: var(${GREEN[115]});
      ${COLORS.FILL_COLOR_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.FILL_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.FILL_BG_ACTIVE}: var(${GREEN[125]});
      ${COLORS.FILL_COLOR_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.FILL_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.FILL_BG_LOADING}: var(${BLUE_GREY[60]});
      ${COLORS.FILL_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.FILL_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.FILL_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.FILL_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.ON_ACCENT_FILL}: var(${BLUE_GREY[80]});
      ${COLORS.ON_ACCENT_BG}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.ON_ACCENT_BG_HOVER}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ON_ACCENT_BG_ACTIVE}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ON_ACCENT_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_BG_LOADING}: var(${BLUE_GREY[60]});
      ${COLORS.ON_ACCENT_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT_BG_DISABLED}: var(${WHITE_ALFA[48]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.OUTLINE_FILL}: var(${GREEN[100]});
      ${COLORS.OUTLINE_BORDER}: var(${GREEN[100]});
      ${COLORS.OUTLINE_COLOR}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_FILL_LOADING}: var(${GREY[0]});
      ${COLORS.OUTLINE_BG_LOADING}: var(${BLUE_GREY[60]});
      ${COLORS.OUTLINE_COLOR_LOADING}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_BORDER_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;
