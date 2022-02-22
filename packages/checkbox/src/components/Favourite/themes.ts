import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, WHITE_ALFA, BLACK_ALFA, BLUE_GREY, GREEN, SUNNY_YELLOW } = EXPORT_VARS;

export const COLORS = {
  WEAK: {
    INACTIVE: '--color-weak-inactive',
    HOVER: '--color-weak-hover',
    ACTIVE: '--color-weak-active',
    DISABLED: '--color-weak-disabled',
  },
  STRONG: {
    INACTIVE: '--color-strong-inactive',
    HOVER: '--color-strong-hover',
    ACTIVE: '--color-strong-active',
    DISABLED: '--color-strong-disabled',
  },
  ON_ACCENT: {
    INACTIVE: '--color-on-accent-inactive',
    HOVER: '--color-on-accent-hover',
    ACTIVE: '--color-on-accent-active',
    DISABLED: '--color-on-accent-disabled',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.WEAK.INACTIVE}: var(${GREY[200]});
      ${COLORS.WEAK.HOVER}: var(${BLUE_GREY[60]});
      ${COLORS.WEAK.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.WEAK.DISABLED}: var(${BLACK_ALFA[8]});
      ${COLORS.STRONG.INACTIVE}: var(${GREY[400]});
      ${COLORS.STRONG.HOVER}: var(${BLUE_GREY[80]});
      ${COLORS.STRONG.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.STRONG.DISABLED}: var(${BLACK_ALFA[8]});
      ${COLORS.ON_ACCENT.INACTIVE}: var(${WHITE_ALFA[48]});
      ${COLORS.ON_ACCENT.HOVER}: var(${GREY[0]});
      ${COLORS.ON_ACCENT.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.ON_ACCENT.DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.WEAK.INACTIVE}: var(${GREY[450]});
      ${COLORS.WEAK.HOVER}: var(${GREY[200]});
      ${COLORS.WEAK.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.WEAK.DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.STRONG.INACTIVE}: var(${GREY[200]});
      ${COLORS.STRONG.HOVER}: var(${GREY[0]});
      ${COLORS.STRONG.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.STRONG.DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT.INACTIVE}: var(${WHITE_ALFA[48]});
      ${COLORS.ON_ACCENT.HOVER}: var(${GREY[0]});
      ${COLORS.ON_ACCENT.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.ON_ACCENT.DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.WEAK.INACTIVE}: var(${GREY[200]});
      ${COLORS.WEAK.HOVER}: var(${BLUE_GREY[60]});
      ${COLORS.WEAK.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.WEAK.DISABLED}: var(${BLACK_ALFA[8]});
      ${COLORS.STRONG.INACTIVE}: var(${GREY[400]});
      ${COLORS.STRONG.HOVER}: var(${BLUE_GREY[80]});
      ${COLORS.STRONG.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.STRONG.DISABLED}: var(${BLACK_ALFA[8]});
      ${COLORS.ON_ACCENT.INACTIVE}: var(${WHITE_ALFA[48]});
      ${COLORS.ON_ACCENT.HOVER}: var(${GREY[0]});
      ${COLORS.ON_ACCENT.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.ON_ACCENT.DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.WEAK.INACTIVE}: var(${GREY[450]});
      ${COLORS.WEAK.HOVER}: var(${GREY[200]});
      ${COLORS.WEAK.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.WEAK.DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.STRONG.INACTIVE}: var(${GREY[200]});
      ${COLORS.STRONG.HOVER}: var(${GREY[0]});
      ${COLORS.STRONG.ACTIVE}: var(${SUNNY_YELLOW[100]});
      ${COLORS.STRONG.DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT.INACTIVE}: var(${GREEN[25]});
      ${COLORS.ON_ACCENT.HOVER}: var(${GREEN[10]});
      ${COLORS.ON_ACCENT.ACTIVE}: var(${GREY[0]});
      ${COLORS.ON_ACCENT.DISABLED}: var(${WHITE_ALFA[48]});
    }
  }
`;
