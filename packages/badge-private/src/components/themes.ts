import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { PURPLE, GREEN, GREY, WHITE_ALFA, BLUE_GREY, BLACK_ALFA, BERRY_RED } = EXPORT_VARS;

export const COLORS = {
  DEFAULT_BACKGROUND: '--color-badge-default-background',
  ALERT_BACKGROUND: '--color-badge-alert-background',
  DEFAULT_TEXT_COLOR: '--color-badge-default-text',
  ALERT_TEXT_COLOR: '--color-badge-alert-text',
  BORDER: '--color-badge-border',
  DISABLED_DEFAULT_BACKGROUND: '--color-badge-disabled-default-background',
  DISABLED_ALERT_BACKGROUND: '--color-badge-disabled-alert-background',
  DISABLED_TEXT_COLOR: '--color-badge-disabled-text',
  DOT_DEFAULT_COLOR: '--color-badge-dot-default',
  DOT_ALERT_COLOR: '--color-badge-dot-alert',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.DEFAULT_BACKGROUND}: var(${PURPLE[100]});
      ${COLORS.ALERT_BACKGROUND}: var(${BERRY_RED[100]});
      ${COLORS.DEFAULT_TEXT_COLOR}: var(${GREY[0]});
      ${COLORS.ALERT_TEXT_COLOR}: var(${GREY[0]});
      ${COLORS.BORDER}: var(${GREY[0]});
      ${COLORS.DISABLED_DEFAULT_BACKGROUND}: var(${PURPLE[25]});
      ${COLORS.DISABLED_ALERT_BACKGROUND}: var(${GREY[150]});
      ${COLORS.DISABLED_TEXT_COLOR}: var(${GREY[0]});
      ${COLORS.DOT_DEFAULT_COLOR}: var(${GREY[0]});
      ${COLORS.DOT_ALERT_COLOR}: var(${GREY[0]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.DEFAULT_BACKGROUND}: var(${PURPLE[100]});
      ${COLORS.ALERT_BACKGROUND}: var(${BERRY_RED[100]});
      ${COLORS.DEFAULT_TEXT_COLOR}: var(${GREY[0]});
      ${COLORS.ALERT_TEXT_COLOR}: var(${GREY[0]});
      ${COLORS.BORDER}: var(${GREY[850]});
      ${COLORS.DISABLED_DEFAULT_BACKGROUND}: var(${PURPLE[150]});
      ${COLORS.DISABLED_ALERT_BACKGROUND}: var(${GREY[750]});
      ${COLORS.DISABLED_TEXT_COLOR}: var(${WHITE_ALFA[24]});
      ${COLORS.DOT_DEFAULT_COLOR}: var(${GREY[0]});
      ${COLORS.DOT_ALERT_COLOR}: var(${GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.DEFAULT_BACKGROUND}: var(${GREEN[100]});
      ${COLORS.ALERT_BACKGROUND}: var(${BERRY_RED[100]});
      ${COLORS.DEFAULT_TEXT_COLOR}: var(${BLUE_GREY[100]});
      ${COLORS.ALERT_TEXT_COLOR}: var(${GREY[0]});
      ${COLORS.BORDER}: var(${GREY[0]});
      ${COLORS.DISABLED_DEFAULT_BACKGROUND}: var(${GREEN[25]});
      ${COLORS.DISABLED_ALERT_BACKGROUND}: var(${GREY[150]});
      ${COLORS.DISABLED_TEXT_COLOR}: var(${BLACK_ALFA[16]});
      ${COLORS.DOT_DEFAULT_COLOR}: var(${BLUE_GREY[100]});
      ${COLORS.DOT_ALERT_COLOR}: var(${GREY[0]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.DEFAULT_BACKGROUND}: var(${GREEN[100]});
      ${COLORS.ALERT_BACKGROUND}: var(${BERRY_RED[100]});
      ${COLORS.DEFAULT_TEXT_COLOR}: var(${BLUE_GREY[100]});
      ${COLORS.ALERT_TEXT_COLOR}: var(${GREY[0]});
      ${COLORS.BORDER}: var(${GREY[850]});
      ${COLORS.DISABLED_DEFAULT_BACKGROUND}: var(${GREEN[150]});
      ${COLORS.DISABLED_ALERT_BACKGROUND}: var(${GREY[750]});
      ${COLORS.DISABLED_TEXT_COLOR}: var(${BLACK_ALFA[24]});
      ${COLORS.DOT_DEFAULT_COLOR}: var(${BLUE_GREY[100]});
      ${COLORS.DOT_ALERT_COLOR}: var(${GREY[0]});
    }
  }
`;
