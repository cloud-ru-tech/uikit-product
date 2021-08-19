import { css } from '@linaria/core';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { GREY, PURPLE, GREEN, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  ACCENT_COLOR: '--color-button-ghost-accent-color',
  ACCENT_COLOR_HOVER: '--color-button-ghost-accent-color-hover',
  ACCENT_COLOR_ACTIVE: '--color-button-ghost-accent-color-active',
  ACCENT_COLOR_DISABLED: '--color-button-ghost-accent-color-disabled',

  PRIMARY_COLOR: '--color-button-ghost-primary-color',
  PRIMARY_COLOR_HOVER: '--color-button-ghost-primary-color-hover',
  PRIMARY_COLOR_ACTIVE: '--color-button-ghost-primary-color-active',
  PRIMARY_COLOR_DISABLED: '--color-button-ghost-primary-color-disabled',

  SECONDARY_COLOR: '--color-button-ghost-secondary-color',
  SECONDARY_COLOR_HOVER: '--color-button-ghost-secondary-color-hover',
  SECONDARY_COLOR_ACTIVE: '--color-button-ghost-secondary-color-active',
  SECONDARY_COLOR_DISABLED: '--color-button-ghost-secondary-color-disabled',
};

/* TODO: использовать [data-theme='${Themes.Purple}'] */
export const PURPLE_THEME = css`
  :global() {
    [data-theme='purple'] {
      ${COLORS.ACCENT_COLOR}: var(${PURPLE[100]});
      ${COLORS.ACCENT_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.ACCENT_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ACCENT_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.PRIMARY_COLOR}: var(${GREY[600]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.SECONDARY_COLOR}: var(${GREY[350]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
    }
  }
`;

/* TODO: использовать [data-theme='${Themes.PurpleDark}'] */
export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme='purpleDark'] {
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

/* TODO: использовать [data-theme='${Themes.Green}'] */
export const GREEN_THEME = css`
  :global() {
    [data-theme='green'] {
      ${COLORS.ACCENT_COLOR}: var(${GREEN[100]});
      ${COLORS.ACCENT_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.ACCENT_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ACCENT_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.PRIMARY_COLOR}: var(${GREY[600]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.SECONDARY_COLOR}: var(${GREY[350]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
    }
  }
`;

/* TODO: использовать [data-theme='${Themes.GreenDark}'] */
export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme='greenDark'] {
      ${COLORS.ACCENT_COLOR}: var(${GREEN[100]});
      ${COLORS.ACCENT_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.ACCENT_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.PRIMARY_COLOR}: var(${GREY[0]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.SECONDARY_COLOR}: var(${WHITE_ALFA[48]});
      ${COLORS.SECONDARY_COLOR_HOVER}: var(${GREEN[50]});
      ${COLORS.SECONDARY_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.SECONDARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;
