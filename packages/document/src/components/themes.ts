import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { PURPLE, PURPLE_ALFA, GREEN, GREEN_ALFA, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  BORDER: '--color-document-border',
  BORDER_HOVER: '--color-document-border-hover',
  BORDER_ACTIVE: '--color-document-border-active',
  BG: '--color-document-bg',
  BG_HOVER: '--color-document-bg-hover',
  PRIMARY_COLOR: '--color-document-primary',
  PRIMARY_COLOR_HOVER: '--color-document-primary-hover',
  PRIMARY_COLOR_ACTIVE: '--color-document-primary-active',
  PRIMARY_COLOR_DISABLED: '--color-document-primary-disabled',
  SECONDARY_COLOR: '--color-document-secondary',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.BORDER}: var(${BLACK_ALFA[16]});
      ${COLORS.BORDER_HOVER}: var(${PURPLE[115]});
      ${COLORS.BORDER_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.BG}: transparent;
      ${COLORS.BG_HOVER}: var(${PURPLE_ALFA[4]});
      ${COLORS.PRIMARY_COLOR}: var(${PURPLE[100]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.SECONDARY_COLOR}: var(${BLACK_ALFA[48]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.BORDER_HOVER}: var(${PURPLE[25]});
      ${COLORS.BORDER_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.BG}: transparent;
      ${COLORS.BG_HOVER}: var(${PURPLE_ALFA[4]});
      ${COLORS.PRIMARY_COLOR}: var(${PURPLE[50]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${PURPLE[25]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.SECONDARY_COLOR}: var(${WHITE_ALFA[48]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.BORDER}: var(${BLACK_ALFA[16]});
      ${COLORS.BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.BG}: transparent;
      ${COLORS.BG_HOVER}: var(${GREEN_ALFA[4]});
      ${COLORS.PRIMARY_COLOR}: var(${GREEN[100]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.SECONDARY_COLOR}: var(${BLACK_ALFA[48]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.BORDER_HOVER}: var(${GREEN[50]});
      ${COLORS.BORDER_ACTIVE}: var(${GREEN[10]});
      ${COLORS.BG}: transparent;
      ${COLORS.BG_HOVER}: var(${GREEN_ALFA[4]});
      ${COLORS.PRIMARY_COLOR}: var(${GREEN[100]});
      ${COLORS.PRIMARY_COLOR_HOVER}: var(${GREEN[25]});
      ${COLORS.PRIMARY_COLOR_ACTIVE}: var(${GREEN[10]});
      ${COLORS.PRIMARY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.SECONDARY_COLOR}: var(${WHITE_ALFA[48]});
    }
  }
`;
