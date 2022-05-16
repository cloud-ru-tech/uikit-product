import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLUE_GREY, BERRY_RED, GRACE, SUNNY_YELLOW, EMERALD_GREEN } = EXPORT_VARS;

export const COLORS = {
  SUCCESS_BG: '--status-dot-success-bg',
  FAILED_BG: '--status-dot-failed-bg',
  WARNING_BG: '--status-dot-warning-bg',
  UNACTIVE_BG: '--status-dot-unactive-bg',
  PROGRESS_BG: '--status-dot-progress-bg',
  NEUTRAL_BG: '--status-dot-neutral-bg',

  BORDER_COLOR: '--status-dot-border-color',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.SUCCESS_BG}: var(${EMERALD_GREEN[100]});
      ${COLORS.FAILED_BG}: var(${BERRY_RED[100]});
      ${COLORS.WARNING_BG}: var(${SUNNY_YELLOW[100]});
      ${COLORS.UNACTIVE_BG}: var(${GREY[300]});
      ${COLORS.PROGRESS_BG}: var(${GRACE[6]});
      ${COLORS.NEUTRAL_BG}: var(${BLUE_GREY[80]});

      ${COLORS.BORDER_COLOR}: var(${GREY[25]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.SUCCESS_BG}: var(${EMERALD_GREEN[75]});
      ${COLORS.FAILED_BG}: var(${BERRY_RED[75]});
      ${COLORS.WARNING_BG}: var(${SUNNY_YELLOW[100]});
      ${COLORS.UNACTIVE_BG}: var(${GREY[550]});
      ${COLORS.PROGRESS_BG}: var(${GRACE[6]});
      ${COLORS.NEUTRAL_BG}: var(${GREY[200]});

      ${COLORS.BORDER_COLOR}: var(${GREY[800]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.SUCCESS_BG}: var(${EMERALD_GREEN[100]});
      ${COLORS.FAILED_BG}: var(${BERRY_RED[100]});
      ${COLORS.WARNING_BG}: var(${SUNNY_YELLOW[100]});
      ${COLORS.UNACTIVE_BG}: var(${GREY[300]});
      ${COLORS.PROGRESS_BG}: var(${GRACE[6]});
      ${COLORS.NEUTRAL_BG}: var(${BLUE_GREY[80]});

      ${COLORS.BORDER_COLOR}: var(${GREY[25]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.SUCCESS_BG}: var(${EMERALD_GREEN[75]});
      ${COLORS.FAILED_BG}: var(${BERRY_RED[75]});
      ${COLORS.WARNING_BG}: var(${SUNNY_YELLOW[100]});
      ${COLORS.UNACTIVE_BG}: var(${GREY[550]});
      ${COLORS.PROGRESS_BG}: var(${GRACE[6]});
      ${COLORS.NEUTRAL_BG}: var(${GREY[200]});

      ${COLORS.BORDER_COLOR}: var(${GREY[800]});
    }
  }
`;
