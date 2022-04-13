import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, PURPLE, GREEN, WHITE_ALFA, PURPLE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  BACKGROUND_ACTIVE: '--color-switch-background-active',
  BACKGROUND_INACTIVE: '--color-switch-background-inactive',
  BACKGROUND_ACTIVE_DISABLED: '--color-switch-background-active-disabled',
  BACKGROUND_INACTIVE_DISABLED: '--color-switch-background-inactive-disabled',
  BACKGROUND_ACTIVE_HOVERED: '--color-switch-background-active-hovered',
  BACKGROUND_INACTIVE_HOVERED: '--color-switch-background-inactive-hovered',
  HANDLE_INACTIVE: '--color-switch-handle',
  HANDLE_ACTIVE: '--color-switch-handle-active',
  HANDLE_INACTIVE_DISABLED: '--color-switch-handle-disabled',
  HANDLE_ACTIVE_DISABLED: '--color-switch-handle-active-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.BACKGROUND_ACTIVE}: var(${PURPLE[100]});
      ${COLORS.BACKGROUND_INACTIVE}: var(${BLACK_ALFA[16]});
      ${COLORS.BACKGROUND_ACTIVE_DISABLED}: var(${PURPLE[25]});
      ${COLORS.BACKGROUND_INACTIVE_DISABLED}: var(${BLACK_ALFA[8]});
      ${COLORS.BACKGROUND_ACTIVE_HOVERED}: var(${PURPLE[115]});
      ${COLORS.BACKGROUND_INACTIVE_HOVERED}: var(${BLACK_ALFA[24]});
      ${COLORS.HANDLE_INACTIVE}: var(${GREY[0]});
      ${COLORS.HANDLE_ACTIVE}: var(${GREY[0]});
      ${COLORS.HANDLE_INACTIVE_DISABLED}: var(${WHITE_ALFA[48]});
      ${COLORS.HANDLE_ACTIVE_DISABLED}: var(${GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.BACKGROUND_ACTIVE}: var(${GREEN[100]});
      ${COLORS.BACKGROUND_INACTIVE}: var(${BLACK_ALFA[16]});
      ${COLORS.BACKGROUND_ACTIVE_DISABLED}: var(${GREEN[25]});
      ${COLORS.BACKGROUND_INACTIVE_DISABLED}: var(${BLACK_ALFA[8]});
      ${COLORS.BACKGROUND_ACTIVE_HOVERED}: var(${GREEN[115]});
      ${COLORS.BACKGROUND_INACTIVE_HOVERED}: var(${BLACK_ALFA[24]});
      ${COLORS.HANDLE_INACTIVE}: var(${GREY[0]});
      ${COLORS.HANDLE_ACTIVE}: var(${GREY[0]});
      ${COLORS.HANDLE_INACTIVE_DISABLED}: var(${WHITE_ALFA[48]});
      ${COLORS.HANDLE_ACTIVE_DISABLED}: var(${GREY[0]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.BACKGROUND_ACTIVE}: var(${PURPLE[75]});
      ${COLORS.BACKGROUND_INACTIVE}: var(${WHITE_ALFA[24]});
      ${COLORS.BACKGROUND_ACTIVE_DISABLED}: var(${PURPLE_ALFA[48]});
      ${COLORS.BACKGROUND_INACTIVE_DISABLED}: var(${WHITE_ALFA[8]});
      ${COLORS.BACKGROUND_ACTIVE_HOVERED}: var(${PURPLE[50]});
      ${COLORS.BACKGROUND_INACTIVE_HOVERED}: var(${WHITE_ALFA[48]});
      ${COLORS.HANDLE_INACTIVE}: var(${GREY[0]});
      ${COLORS.HANDLE_ACTIVE}: var(${GREY[0]});
      ${COLORS.HANDLE_INACTIVE_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.HANDLE_ACTIVE_DISABLED}: var(${WHITE_ALFA[48]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.BACKGROUND_ACTIVE}: var(${GREEN[100]});
      ${COLORS.BACKGROUND_INACTIVE}: var(${WHITE_ALFA[24]});
      ${COLORS.BACKGROUND_ACTIVE_DISABLED}: var(${GREEN[150]});
      ${COLORS.BACKGROUND_INACTIVE_DISABLED}: var(${WHITE_ALFA[8]});
      ${COLORS.BACKGROUND_ACTIVE_HOVERED}: var(${GREEN[75]});
      ${COLORS.BACKGROUND_INACTIVE_HOVERED}: var(${WHITE_ALFA[48]});
      ${COLORS.HANDLE_INACTIVE}: var(${GREY[0]});
      ${COLORS.HANDLE_ACTIVE}: var(${GREY[0]});
      ${COLORS.HANDLE_INACTIVE_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.HANDLE_ACTIVE_DISABLED}: var(${WHITE_ALFA[48]});
    }
  }
`;
