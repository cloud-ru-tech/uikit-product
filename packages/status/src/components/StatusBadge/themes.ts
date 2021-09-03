import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, BLUE_GREY, PRESET } = EXPORT_VARS;

export const COLORS = {
  SUCCESS_BG: '--status-badge-success-bg',
  FAILED_BG: '--status-badge-failed-bg',
  WARNING_BG: '--status-badge-warning-bg',
  UNACTIVE_BG: '--status-badge-unactive-bg',
  PROGRESS_BG: '--status-badge-progress-bg',
  NEUTRAL_BG: '--status-badge-neutral-bg',

  STATUS_BADGE_BORDER_COLOR: '--status-badge-border-color',
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme='${Themes.Purple}'] {
      ${COLORS.SUCCESS_BG}: var(${PRESET.EMERALD_GREEN});
      ${COLORS.FAILED_BG}: var(${PRESET.BERRY_RED_1});
      ${COLORS.WARNING_BG}: var(${PRESET.SUNNY_YELLOW});
      ${COLORS.UNACTIVE_BG}: var(${GREY[300]});
      ${COLORS.PROGRESS_BG}: var(${PRESET.GRACE_6});
      ${COLORS.NEUTRAL_BG}: var(${BLUE_GREY[80]});

      ${COLORS.STATUS_BADGE_BORDER_COLOR}: var(${GREY[25]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.PurpleDark}'] {
      ${COLORS.SUCCESS_BG}: var(${PRESET.EMERALD_GREEN});
      ${COLORS.FAILED_BG}: var(${PRESET.BERRY_RED_1});
      ${COLORS.WARNING_BG}: var(${PRESET.SUNNY_YELLOW});
      ${COLORS.UNACTIVE_BG}: var(${GREY[550]});
      ${COLORS.PROGRESS_BG}: var(${PRESET.GRACE_6});
      ${COLORS.NEUTRAL_BG}: var(${GREY[200]});

      ${COLORS.STATUS_BADGE_BORDER_COLOR}: var(${GREY[800]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme='${Themes.Green}'] {
      ${COLORS.SUCCESS_BG}: var(${PRESET.EMERALD_GREEN});
      ${COLORS.FAILED_BG}: var(${PRESET.BERRY_RED_1});
      ${COLORS.WARNING_BG}: var(${PRESET.SUNNY_YELLOW});
      ${COLORS.UNACTIVE_BG}: var(${GREY[300]});
      ${COLORS.PROGRESS_BG}: var(${PRESET.GRACE_6});
      ${COLORS.NEUTRAL_BG}: var(${BLUE_GREY[80]});

      ${COLORS.STATUS_BADGE_BORDER_COLOR}: var(${GREY[25]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.GreenDark}'] {
      ${COLORS.SUCCESS_BG}: var(${PRESET.EMERALD_GREEN});
      ${COLORS.FAILED_BG}: var(${PRESET.BERRY_RED_1});
      ${COLORS.WARNING_BG}: var(${PRESET.SUNNY_YELLOW});
      ${COLORS.UNACTIVE_BG}: var(${GREY[550]});
      ${COLORS.PROGRESS_BG}: var(${PRESET.GRACE_6});
      ${COLORS.NEUTRAL_BG}: var(${GREY[200]});

      ${COLORS.STATUS_BADGE_BORDER_COLOR}: var(${GREY[800]});
    }
  }
`;
