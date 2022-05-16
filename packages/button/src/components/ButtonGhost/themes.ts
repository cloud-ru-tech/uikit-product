import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, PURPLE, GREEN, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
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

  TERTIARY_COLOR: '--color-button-ghost-tertiary-color',
  TERTIARY_COLOR_HOVER: '--color-button-ghost-tertiary-color-hover',
  TERTIARY_COLOR_ACTIVE: '--color-button-ghost-tertiary-color-active',
  TERTIARY_COLOR_DISABLED: '--color-button-ghost-tertiary-color-disabled',
  TERTIARY_ICON_COLOR: '--color-button-ghost-icon-tertiary-color',
  TERTIARY_ICON_COLOR_HOVER: '--color-button-ghost-icon-tertiary-color-hover',
  TERTIARY_ICON_COLOR_ACTIVE: '--color-button-ghost-icon-tertiary-color-active',
  TERTIARY_ICON_COLOR_DISABLED: '--color-button-ghost-icon-tertiary-color-disabled',

  ON_ACCENT_COLOR: '--color-button-ghost-on-accent-color',
  ON_ACCENT_COLOR_HOVER: '--color-button-ghost-on-accent-color-hover',
  ON_ACCENT_COLOR_ACTIVE: '--color-button-ghost-on-accent-color-active',
  ON_ACCENT_COLOR_DISABLED: '--color-button-ghost-on-accent-color-disabled',
  ON_ACCENT_ICON_COLOR: '--color-button-ghost-icon-on-accent-color',
  ON_ACCENT_ICON_COLOR_HOVER: '--color-button-ghost-icon-on-accent-color-hover',
  ON_ACCENT_ICON_COLOR_ACTIVE: '--color-button-ghost-icon-on-accent-color-active',
  ON_ACCENT_ICON_COLOR_DISABLED: '--color-button-ghost-icon-on-accent-color-disabled',

  ON_DARK_COLOR: '--color-button-ghost-on-dark-color',
  ON_DARK_COLOR_HOVER: '--color-button-ghost-on-dark-color-hover',
  ON_DARK_COLOR_ACTIVE: '--color-button-ghost-on-dark-color-active',
  ON_DARK_COLOR_DISABLED: '--color-button-ghost-on-dark-color-disabled',
  ON_DARK_ICON_COLOR: '--color-button-ghost-icon-on-dark-color',
  ON_DARK_ICON_COLOR_HOVER: '--color-button-ghost-icon-on-dark-color-hover',
  ON_DARK_ICON_COLOR_ACTIVE: '--color-button-ghost-icon-on-dark-color-active',
  ON_DARK_ICON_COLOR_DISABLED: '--color-button-ghost-icon-on-dark-color-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.PRIMARY_COLOR}: var(${PURPLE[100]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.PRIMARY_ICON_COLOR}: currentColor;
      ${COLORS.PRIMARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.PRIMARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.PRIMARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.SECONDARY_COLOR}: var(${GREY[600]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.SECONDARY_ICON_COLOR}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.TERTIARY_COLOR}: var(${GREY[350]});
      ${COLORS.TERTIARY_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.TERTIARY_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.TERTIARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.TERTIARY_ICON_COLOR}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.ON_ACCENT_COLOR}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_ICON_COLOR}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.ON_DARK_COLOR}: var(${PURPLE[50]});
      ${COLORS.ON_DARK_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.ON_DARK_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.ON_DARK_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_DARK_ICON_COLOR}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_DISABLED}: currentColor;
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.PRIMARY_COLOR}: var(${PURPLE[50]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.PRIMARY_ICON_COLOR}: currentColor;
      ${COLORS.PRIMARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.PRIMARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.PRIMARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.SECONDARY_COLOR}: var(${GREY[0]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.SECONDARY_ICON_COLOR}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.TERTIARY_COLOR}: var(${WHITE_ALFA[48]});
      ${COLORS.TERTIARY_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.TERTIARY_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.TERTIARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.TERTIARY_ICON_COLOR}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.ON_ACCENT_COLOR}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_ICON_COLOR}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.ON_DARK_COLOR}: var(${PURPLE[50]});
      ${COLORS.ON_DARK_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.ON_DARK_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.ON_DARK_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_DARK_ICON_COLOR}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_DISABLED}: currentColor;
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.PRIMARY_COLOR}: var(${GREY[800]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.PRIMARY_ICON_COLOR}: var(${GREEN[100]});
      ${COLORS.PRIMARY_ICON_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.PRIMARY_ICON_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.PRIMARY_ICON_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.SECONDARY_COLOR}: var(${GREY[600]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.SECONDARY_ICON_COLOR}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.TERTIARY_COLOR}: var(${GREY[350]});
      ${COLORS.TERTIARY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.TERTIARY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.TERTIARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.TERTIARY_ICON_COLOR}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.ON_ACCENT_COLOR}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${GREEN[25]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${GREEN[10]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_ICON_COLOR}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.ON_DARK_COLOR}: var(${GREEN[100]});
      ${COLORS.ON_DARK_COLOR_HOVER}: var(${GREEN[25]});
      ${COLORS.ON_DARK_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.ON_DARK_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_DARK_ICON_COLOR}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_DISABLED}: currentColor;
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.PRIMARY_COLOR}: var(${GREEN[100]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.PRIMARY_ICON_COLOR}: currentColor;
      ${COLORS.PRIMARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.PRIMARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.PRIMARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.SECONDARY_COLOR}: var(${GREY[0]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.SECONDARY_ICON_COLOR}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.SECONDARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.TERTIARY_COLOR}: var(${WHITE_ALFA[48]});
      ${COLORS.TERTIARY_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.TERTIARY_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.TERTIARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.TERTIARY_ICON_COLOR}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.TERTIARY_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.ON_ACCENT_COLOR}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${GREEN[25]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${GREEN[10]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_ICON_COLOR}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.ON_ACCENT_ICON_COLOR_DISABLED}: currentColor;

      ${COLORS.ON_DARK_COLOR}: var(${GREEN[100]});
      ${COLORS.ON_DARK_COLOR_HOVER}: var(${GREEN[25]});
      ${COLORS.ON_DARK_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.ON_DARK_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_DARK_ICON_COLOR}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_HOVER}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_ACTIVE}: currentColor;
      ${COLORS.ON_DARK_ICON_COLOR_DISABLED}: currentColor;
    }
  }
`;
