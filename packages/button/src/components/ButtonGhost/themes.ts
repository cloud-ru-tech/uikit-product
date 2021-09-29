import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, PURPLE, GREEN, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  ACCENT_COLOR: '--color-button-ghost-accent-color',
  ACCENT_COLOR_HOVER: '--color-button-ghost-accent-color-hover',
  ACCENT_COLOR_ACTIVE: '--color-button-ghost-accent-color-active',
  ACCENT_COLOR_DISABLED: '--color-button-ghost-accent-color-disabled',
  ACCENT_ICON_COLOR: '--color-button-ghost-icon-accent-color',
  ACCENT_ICON_COLOR_HOVER: '--color-button-ghost-icon-accent-color-hover',
  ACCENT_ICON_COLOR_ACTIVE: '--color-button-ghost-icon-accent-color-active',
  ACCENT_ICON_COLOR_DISABLED: '--color-button-ghost-icon-accent-color-disabled',

  PRIMARY_COLOR: '--color-button-ghost-primary-color',
  PRIMARY_COLOR_HOVER: '--color-button-ghost-primary-color-hover',
  PRIMARY_COLOR_ACTIVE: '--color-button-ghost-primary-color-active',
  PRIMARY_COLOR_DISABLED: '--color-button-ghost-primary-color-disabled',
  PRIMARY_ICON_COLOR: '--color-button-ghost-icon-primary-color',
  PRIMARY_ICON_COLOR_HOVER: '--color-button-ghost-icon-primary-color-hover',
  PRIMARY_ICON_COLOR_ACTIVE: '--color-button-ghost-icon-primary-color-active',
  PRIMARY_ICON_COLOR_DISABLED: '--color-button-ghost-icon-primary-color-disabled',

  SECONDARY_COLOR: '--color-button-ghost-secondary-color',
  SECONDARY_COLOR_HOVER: '--color-button-ghost-secondary-color-hover',
  SECONDARY_COLOR_ACTIVE: '--color-button-ghost-secondary-color-active',
  SECONDARY_COLOR_DISABLED: '--color-button-ghost-secondary-color-disabled',
  SECONDARY_ICON_COLOR: '--color-button-ghost-icon-secondary-color',
  SECONDARY_ICON_COLOR_HOVER: '--color-button-ghost-icon-secondary-color-hover',
  SECONDARY_ICON_COLOR_ACTIVE: '--color-button-ghost-icon-secondary-color-active',
  SECONDARY_ICON_COLOR_DISABLED: '--color-button-ghost-icon-secondary-color-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.ACCENT_COLOR}: var(${PURPLE[100]});
      ${COLORS.ACCENT_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.ACCENT_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ACCENT_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.ACCENT_ICON_COLOR}: var(${PURPLE[100]});
      ${COLORS.ACCENT_ICON_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.ACCENT_ICON_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ACCENT_ICON_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.PRIMARY_COLOR}: var(${GREY[600]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.PRIMARY_ICON_COLOR}: var(${GREY[600]});
      ${COLORS.PRIMARY_ICON_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.PRIMARY_ICON_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.PRIMARY_ICON_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.SECONDARY_COLOR}: var(${GREY[350]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.SECONDARY_ICON_COLOR}: var(${GREY[350]});
      ${COLORS.SECONDARY_ICON_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.SECONDARY_ICON_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.SECONDARY_ICON_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.ACCENT_COLOR}: var(${PURPLE[50]});
      ${COLORS.ACCENT_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.ACCENT_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.PRIMARY_COLOR}: var(${GREY[0]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.SECONDARY_COLOR}: var(${WHITE_ALFA[48]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.ACCENT_COLOR}: var(${GREY[800]});
      ${COLORS.ACCENT_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.ACCENT_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ACCENT_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.ACCENT_ICON_COLOR}: var(${GREEN[100]});
      ${COLORS.ACCENT_ICON_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.ACCENT_ICON_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ACCENT_ICON_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.PRIMARY_COLOR}: var(${GREY[600]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.PRIMARY_ICON_COLOR}: var(${GREY[600]});
      ${COLORS.PRIMARY_ICON_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.PRIMARY_ICON_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.PRIMARY_ICON_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.SECONDARY_COLOR}: var(${GREY[350]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.SECONDARY_ICON_COLOR}: var(${GREY[350]});
      ${COLORS.SECONDARY_ICON_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.SECONDARY_ICON_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.SECONDARY_ICON_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.ACCENT_COLOR}: var(${GREEN[100]});
      ${COLORS.ACCENT_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.ACCENT_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ACCENT_ICON_COLOR}: var(${GREEN[100]});
      ${COLORS.ACCENT_ICON_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.ACCENT_ICON_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.ACCENT_ICON_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.PRIMARY_COLOR}: var(${GREY[0]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.PRIMARY_ICON_COLOR}: var(${GREY[0]});
      ${COLORS.PRIMARY_ICON_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.PRIMARY_ICON_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.PRIMARY_ICON_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.SECONDARY_COLOR}: var(${WHITE_ALFA[48]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.SECONDARY_ICON_COLOR}: var(${WHITE_ALFA[48]});
      ${COLORS.SECONDARY_ICON_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.SECONDARY_ICON_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.SECONDARY_ICON_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;
