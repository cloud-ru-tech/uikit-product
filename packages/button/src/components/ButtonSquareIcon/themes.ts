import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, PURPLE, WHITE_ALFA, GREEN } = EXPORT_VARS;

export const COLORS = {
  DEFAULT_FILL: '--color-button-square-icon-default-fill',
  DEFAULT_BORDER: '--color-button-square-icon-default-border',
  DEFAULT_FILL_HOVER: '--color-button-square-icon-default-fill-hover',
  DEFAULT_BG_HOVER: '--color-button-square-icon-default-bg-hover',
  DEFAULT_BORDER_HOVER: '--color-button-square-icon-default-border-hover',
  DEFAULT_FILL_ACTIVE: '--color-button-square-icon-default-fill-active',
  DEFAULT_BG_ACTIVE: '--color-button-square-icon-default-bg-active',
  DEFAULT_BORDER_ACTIVE: '--color-button-square-icon-default-border-active',
  DEFAULT_FILL_DISABLED: '--color-button-square-icon-default-fill-disabled',
  DEFAULT_BORDER_DISABLED: '--color-button-square-icon-default-border-disabled',

  ACCENT_FILL: '--color-button-square-icon-accent-fill',
  ACCENT_BORDER: '--color-button-square-icon-accent-border',
  ACCENT_FILL_HOVER: '--color-button-square-icon-accent-fill-hover',
  ACCENT_BG_HOVER: '--color-button-square-icon-accent-bg-hover',
  ACCENT_BORDER_HOVER: '--color-button-square-icon-accent-border-hover',
  ACCENT_FILL_ACTIVE: '--color-button-square-icon-accent-fill-active',
  ACCENT_BG_ACTIVE: '--color-button-square-icon-accent-bg-active',
  ACCENT_BORDER_ACTIVE: '--color-button-square-icon-accent-border-active',
  ACCENT_FILL_DISABLED: '--color-button-square-icon-accent-fill-disabled',
  ACCENT_BORDER_DISABLED: '--color-button-square-icon-accent-border-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.DEFAULT_FILL}: var(${PURPLE[100]});
      ${COLORS.DEFAULT_BORDER}: var(${PURPLE[100]});
      ${COLORS.DEFAULT_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.DEFAULT_BG_HOVER}: transparent;
      ${COLORS.DEFAULT_BORDER_HOVER}: var(${PURPLE[115]});
      ${COLORS.DEFAULT_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.DEFAULT_BG_ACTIVE}: transparent;
      ${COLORS.DEFAULT_BORDER_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.DEFAULT_FILL_DISABLED}: var(${PURPLE[50]});
      ${COLORS.DEFAULT_BORDER_DISABLED}: var(${PURPLE[50]});

      ${COLORS.ACCENT_FILL}: var(${GREY[0]});
      ${COLORS.ACCENT_BORDER}: var(${GREY[0]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ACCENT_BG_HOVER}: var(${WHITE_ALFA[8]});
      ${COLORS.ACCENT_BORDER_HOVER}: var(${PURPLE[25]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.ACCENT_BG_ACTIVE}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_BORDER_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_BORDER_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.DEFAULT_FILL}: var(${GREY[0]});
      ${COLORS.DEFAULT_BORDER}: var(${PURPLE[100]});
      ${COLORS.DEFAULT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.DEFAULT_BG_HOVER}: var(${WHITE_ALFA[8]});
      ${COLORS.DEFAULT_BORDER_HOVER}: var(${PURPLE[25]});
      ${COLORS.DEFAULT_FILL_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.DEFAULT_BG_ACTIVE}: var(${WHITE_ALFA[16]});
      ${COLORS.DEFAULT_BORDER_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.DEFAULT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.DEFAULT_BORDER_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.ACCENT_FILL}: var(${GREY[0]});
      ${COLORS.ACCENT_BORDER}: var(${GREY[0]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ACCENT_BG_HOVER}: var(${WHITE_ALFA[8]});
      ${COLORS.ACCENT_BORDER_HOVER}: var(${PURPLE[25]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.ACCENT_BG_ACTIVE}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_BORDER_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_BORDER_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.DEFAULT_FILL}: var(${GREEN[100]});
      ${COLORS.DEFAULT_BORDER}: var(${GREEN[100]});
      ${COLORS.DEFAULT_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.DEFAULT_BG_HOVER}: transparent;
      ${COLORS.DEFAULT_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.DEFAULT_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.DEFAULT_BG_ACTIVE}: transparent;
      ${COLORS.DEFAULT_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.DEFAULT_FILL_DISABLED}: var(${GREY[200]});
      ${COLORS.DEFAULT_BORDER_DISABLED}: var(${GREY[200]});

      ${COLORS.ACCENT_FILL}: var(${GREY[0]});
      ${COLORS.ACCENT_BORDER}: var(${GREEN[100]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.ACCENT_BG_HOVER}: transparent;
      ${COLORS.ACCENT_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ACCENT_BG_ACTIVE}: transparent;
      ${COLORS.ACCENT_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_BORDER_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.DEFAULT_FILL}: var(${GREY[0]});
      ${COLORS.DEFAULT_BORDER}: var(${GREEN[100]});
      ${COLORS.DEFAULT_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.DEFAULT_BG_HOVER}: transparent;
      ${COLORS.DEFAULT_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.DEFAULT_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.DEFAULT_BG_ACTIVE}: transparent;
      ${COLORS.DEFAULT_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.DEFAULT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.DEFAULT_BORDER_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.ACCENT_FILL}: var(${GREY[0]});
      ${COLORS.ACCENT_BORDER}: var(${GREY[0]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ACCENT_BG_HOVER}: var(${WHITE_ALFA[8]});
      ${COLORS.ACCENT_BORDER_HOVER}: var(${GREY[0]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ACCENT_BG_ACTIVE}: var(${WHITE_ALFA[16]});
      ${COLORS.ACCENT_BORDER_ACTIVE}: var(${GREY[0]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[48]});
      ${COLORS.ACCENT_BORDER_DISABLED}: var(${WHITE_ALFA[48]});
    }
  }
`;
