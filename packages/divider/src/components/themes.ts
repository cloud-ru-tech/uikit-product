import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

import { Variant } from './constants';

const { GREY, BLACK_ALFA, PURPLE, WHITE_ALFA, GREEN } = EXPORT_VARS;

export const COLORS = {
  primary: '--color-divider-primary',
  secondary: '--color-divider-secondary',
  accent: '--color-divider-accent',
  extra: '--color-divider-extra',
};

export const PURPLE_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme=${Themes.Purple}] {
      ${COLORS[Variant.Primary]}: var(${BLACK_ALFA[16]});
      ${COLORS[Variant.Secondary]}: var(${BLACK_ALFA[8]});
      ${COLORS[Variant.Accent]}: var(${PURPLE[100]});
      ${COLORS[Variant.Extra]}: var(${GREY[800]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme=${Themes.PurpleDark}] {
      ${COLORS[Variant.Primary]}: var(${WHITE_ALFA[16]});
      ${COLORS[Variant.Secondary]}: var(${WHITE_ALFA[8]});
      ${COLORS[Variant.Accent]}: var(${PURPLE[50]});
      ${COLORS[Variant.Extra]}: var(${GREY[100]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme=${Themes.Green}] {
      ${COLORS[Variant.Primary]}: var(${BLACK_ALFA[16]});
      ${COLORS[Variant.Secondary]}: var(${BLACK_ALFA[8]});
      ${COLORS[Variant.Accent]}: var(${GREEN[100]});
      ${COLORS[Variant.Extra]}: var(${GREY[800]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme=${Themes.GreenDark}] {
      ${COLORS[Variant.Primary]}: var(${WHITE_ALFA[16]});
      ${COLORS[Variant.Secondary]}: var(${WHITE_ALFA[8]});
      ${COLORS[Variant.Accent]}: var(${GREEN[50]});
      ${COLORS[Variant.Extra]}: var(${GREY[100]});
    }
  }
`;
