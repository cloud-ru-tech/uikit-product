import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, PURPLE, GREEN, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  BACKGROUND_ACTIVE: '--color-switch-background-active',
  BACKGROUND_INACTIVE: '--color-switch-background-inactive',
  BACKGROUND_ACTIVE_DISABLED: '--color-switch-background-active-disabled',
  BACKGROUND_INACTIVE_DISABLED: '--color-switch-background-inactive-disabled',
  BACKGROUND_ACTIVE_HOVERED: '--color-switch-background-active-hovered',
  BACKGROUND_INACTIVE_HOVERED: '--color-switch-background-inactive-hovered',
  HANDLE: '--color-switch-handle',
  HANDLE_DISABLED: '--color-switch-handle-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme=${Themes.Purple}] {
      ${COLORS.BACKGROUND_ACTIVE}: var(${PURPLE[100]});
      ${COLORS.BACKGROUND_INACTIVE}: var(${GREY[200]});
      ${COLORS.BACKGROUND_ACTIVE_DISABLED}: var(${PURPLE[25]});
      ${COLORS.BACKGROUND_INACTIVE_DISABLED}: var(${GREY[100]});
      ${COLORS.BACKGROUND_ACTIVE_HOVERED}: var(${PURPLE[115]});
      ${COLORS.BACKGROUND_INACTIVE_HOVERED}: var(${GREY[300]});
      ${COLORS.HANDLE}: var(${GREY[0]});
      ${COLORS.HANDLE_DISABLED}: var(${GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme=${Themes.Green}] {
      ${COLORS.BACKGROUND_ACTIVE}: var(${GREEN[100]});
      ${COLORS.BACKGROUND_INACTIVE}: var(${GREY[200]});
      ${COLORS.BACKGROUND_ACTIVE_DISABLED}: var(${GREEN[25]});
      ${COLORS.BACKGROUND_INACTIVE_DISABLED}: var(${GREY[100]});
      ${COLORS.BACKGROUND_ACTIVE_HOVERED}: var(${GREEN[115]});
      ${COLORS.BACKGROUND_INACTIVE_HOVERED}: var(${GREY[300]});
      ${COLORS.HANDLE}: var(${GREY[0]});
      ${COLORS.HANDLE_DISABLED}: var(${GREY[0]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.PurpleDark}] {
      ${COLORS.BACKGROUND_ACTIVE}: var(${PURPLE[100]});
      ${COLORS.BACKGROUND_INACTIVE}: var(${GREY[450]});
      ${COLORS.BACKGROUND_ACTIVE_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.BACKGROUND_INACTIVE_DISABLED}: var(${GREY[750]});
      ${COLORS.BACKGROUND_ACTIVE_HOVERED}: var(${PURPLE[115]});
      ${COLORS.BACKGROUND_INACTIVE_HOVERED}: var(${GREY[600]});
      ${COLORS.HANDLE}: var(${GREY[0]});
      ${COLORS.HANDLE_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.GreenDark}] {
      ${COLORS.BACKGROUND_ACTIVE}: var(${GREEN[115]});
      ${COLORS.BACKGROUND_INACTIVE}: var(${GREY[450]});
      ${COLORS.BACKGROUND_ACTIVE_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.BACKGROUND_INACTIVE_DISABLED}: var(${GREY[750]});
      ${COLORS.BACKGROUND_ACTIVE_HOVERED}: var(${GREEN[125]});
      ${COLORS.BACKGROUND_INACTIVE_HOVERED}: var(${GREY[600]});
      ${COLORS.HANDLE}: var(${GREY[0]});
      ${COLORS.HANDLE_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;
