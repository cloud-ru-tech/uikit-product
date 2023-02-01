import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { BLACK_ALFA, WHITE_ALFA, PURPLE, GREEN, GREY } = EXPORT_VARS;

export const COLORS = {
  PRIMARY_FILL: '--color-link-primary-fill',
  PRIMARY_COLOR: '--color-link-primary-color',
  PRIMARY_FILL_HOVER: '--color-button-icon-primary-fill-hover',
  PRIMARY_FILL_ACTIVE: '--color-button-icon-primary-fill-active',
  PRIMARY_FILL_DISABLED: '--color-button-icon-primary-fill-disabled',
  PRIMARY_PREFIX_ICON: '--color-link-primary-prefix-icon',
  PRIMARY_PREFIX_ICON_DISABLED: '--color-link-primary-prefix-icon-disabled',

  DARK_FILL: '--color-link-dark-fill',
  DARK_FILL_HOVER: '--color-link-dark-fill-hover',
  DARK_FILL_ACTIVE: '--color-link-dark-fill-active',
  DARK_FILL_DISABLED: '--color-link-dark-fill-disabled',
  DARK_PREFIX_ICON: '--color-link-dark-prefix-icon',
  DARK_PREFIX_ICON_DISABLED: '--color-link-dark-prefix-icon-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.PRIMARY_FILL}: var(${PURPLE[100]});
      ${COLORS.PRIMARY_COLOR}: var(${PURPLE[100]});
      ${COLORS.PRIMARY_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.PRIMARY_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.PRIMARY_FILL_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.PRIMARY_PREFIX_ICON}: var(${GREY[200]});
      ${COLORS.PRIMARY_PREFIX_ICON_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.DARK_FILL}: var(${PURPLE[50]});
      ${COLORS.DARK_FILL_HOVER}: var(${PURPLE[25]});
      ${COLORS.DARK_FILL_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.DARK_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.DARK_PREFIX_ICON}: var(${GREY[450]});
      ${COLORS.DARK_PREFIX_ICON_DISABLED}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.PRIMARY_FILL}: var(${PURPLE[50]});
      ${COLORS.PRIMARY_COLOR}: var(${PURPLE[50]});
      ${COLORS.PRIMARY_FILL_HOVER}: var(${PURPLE[25]});
      ${COLORS.PRIMARY_FILL_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.PRIMARY_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.PRIMARY_PREFIX_ICON}: var(${GREY[450]});
      ${COLORS.PRIMARY_PREFIX_ICON_DISABLED}: var(${WHITE_ALFA[8]});

      ${COLORS.DARK_FILL}: var(${PURPLE[50]});
      ${COLORS.DARK_FILL_HOVER}: var(${PURPLE[25]});
      ${COLORS.DARK_FILL_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.DARK_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.DARK_PREFIX_ICON}: var(${GREY[450]});
      ${COLORS.DARK_PREFIX_ICON_DISABLED}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.PRIMARY_FILL}: var(${GREEN[125]});
      ${COLORS.PRIMARY_COLOR}: var(${GREY[600]});
      ${COLORS.PRIMARY_FILL_HOVER}: var(${GREEN[135]});
      ${COLORS.PRIMARY_FILL_ACTIVE}: var(${GREEN[150]});
      ${COLORS.PRIMARY_FILL_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.PRIMARY_PREFIX_ICON}: var(${GREY[200]});
      ${COLORS.PRIMARY_PREFIX_ICON_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.DARK_FILL}: var(${GREEN[100]});
      ${COLORS.DARK_FILL_HOVER}: var(${GREEN[25]});
      ${COLORS.DARK_FILL_ACTIVE}: var(${GREEN[10]});
      ${COLORS.DARK_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.DARK_PREFIX_ICON}: var(${GREY[450]});
      ${COLORS.DARK_PREFIX_ICON_DISABLED}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.PRIMARY_FILL}: var(${GREEN[100]});
      ${COLORS.PRIMARY_COLOR}: var(${GREEN[100]});
      ${COLORS.PRIMARY_FILL_HOVER}: var(${GREEN[25]});
      ${COLORS.PRIMARY_FILL_ACTIVE}: var(${GREEN[10]});
      ${COLORS.PRIMARY_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.PRIMARY_PREFIX_ICON}: var(${GREY[450]});
      ${COLORS.PRIMARY_PREFIX_ICON_DISABLED}: var(${WHITE_ALFA[8]});

      ${COLORS.DARK_FILL}: var(${GREEN[100]});
      ${COLORS.DARK_FILL_HOVER}: var(${GREEN[25]});
      ${COLORS.DARK_FILL_ACTIVE}: var(${GREEN[10]});
      ${COLORS.DARK_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.DARK_PREFIX_ICON}: var(${GREY[450]});
      ${COLORS.DARK_PREFIX_ICON_DISABLED}: var(${WHITE_ALFA[8]});
    }
  }
`;
