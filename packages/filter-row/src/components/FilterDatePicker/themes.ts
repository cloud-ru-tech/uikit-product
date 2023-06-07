import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, PURPLE, PURPLE_ALFA, GREEN, GREEN_ALFA, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  TEXT: '--color-datepicker-text',
  BACKGROUND: '--color-datepicker-bg',

  DATE: '--color-datepicker-date',
  DATE_BACKGROUND_HOVER: '--color-datepicker-date-bg-hover',

  TODAY: '--color-datepicker-today',
  TODAY_BORDER: '--color-datepicker-today-border',

  DAY_NAME: '--color-datepicker-day-name',

  MUTED: '--color-datepicker-muted',

  SELECTED: '--color-datepicker-selected',
  SELECTED_RANGE: '--color-datepicker-selected-range',
  SELECTED_BACKGROUND: '--color-datepicker-selected-bg',
  SELECTED_RANGE_BACKGROUND: '--color-datepicker-selected-range-bg',
  SELECTED_BACKGROUND_HOVER: '--color-datepicker-selected-bg-hover',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.BACKGROUND}: var(${GREY[0]});
      ${COLORS.TEXT}: var(${GREY[600]});

      ${COLORS.DATE}: var(${GREY[600]});
      ${COLORS.DATE_BACKGROUND_HOVER}: var(${PURPLE_ALFA[8]});

      ${COLORS.TODAY}: var(${GREY[600]});
      ${COLORS.TODAY_BORDER}: var(${PURPLE[100]});

      ${COLORS.DAY_NAME}: var(${GREY[800]});
      ${COLORS.MUTED}: var(${BLACK_ALFA[16]});

      ${COLORS.SELECTED}: var(${GREY[0]});
      ${COLORS.SELECTED_RANGE}: var(${BLACK_ALFA[48]});
      ${COLORS.SELECTED_BACKGROUND}: var(${PURPLE[100]});
      ${COLORS.SELECTED_BACKGROUND_HOVER}: var(${PURPLE[75]});
      ${COLORS.SELECTED_RANGE_BACKGROUND}: var(${PURPLE_ALFA[16]})
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.BACKGROUND}: var(${GREY[800]});
      ${COLORS.TEXT}: var(${GREY[0]});

      ${COLORS.DATE}: var(${GREY[100]});
      ${COLORS.DATE_BACKGROUND_HOVER}: var(${PURPLE_ALFA[24]});

      ${COLORS.TODAY}: var(${GREY[0]});
      ${COLORS.TODAY_BORDER}: var(${PURPLE[75]});

      ${COLORS.DAY_NAME}: var(${GREY[0]});
      ${COLORS.MUTED}: var(${WHITE_ALFA[24]});

      ${COLORS.SELECTED}: var(${GREY[0]});
      ${COLORS.SELECTED_BACKGROUND}: var(${PURPLE[75]});
      ${COLORS.SELECTED_BACKGROUND_HOVER}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.BACKGROUND}: var(${GREY[0]});
      ${COLORS.TEXT}: var(${GREY[600]});

      ${COLORS.DATE}: var(${GREY[600]});
      ${COLORS.DATE_BACKGROUND_HOVER}: var(${GREEN_ALFA[8]});

      ${COLORS.TODAY}: var(${GREY[800]});
      ${COLORS.TODAY_BORDER}: var(${BLACK_ALFA[48]});

      ${COLORS.DAY_NAME}: var(${GREY[800]});
      ${COLORS.MUTED}: var(${BLACK_ALFA[16]});

      ${COLORS.SELECTED}: var(${GREY[800]});
      ${COLORS.SELECTED_RANGE}: var(${GREY[600]});
      ${COLORS.SELECTED_BACKGROUND}: var(${GREEN[100]});
      ${COLORS.SELECTED_BACKGROUND_HOVER}: var(${GREEN[75]});
      ${COLORS.SELECTED_RANGE_BACKGROUND}: var(${GREEN_ALFA[16]})
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.BACKGROUND}: var(${GREY[800]});
      ${COLORS.TEXT}: var(${GREY[0]});

      ${COLORS.DATE}: var(${GREY[100]});
      ${COLORS.DATE_BACKGROUND_HOVER}: var(${GREEN_ALFA[24]});

      ${COLORS.TODAY}: var(${GREY[0]});
      ${COLORS.TODAY_BORDER}: var(${GREEN[75]});

      ${COLORS.DAY_NAME}: var(${GREY[0]});
      ${COLORS.MUTED}: var(${WHITE_ALFA[24]});

      ${COLORS.SELECTED}: var(${GREY[0]});
      ${COLORS.SELECTED_BACKGROUND}: var(${GREEN[75]});
      ${COLORS.SELECTED_BACKGROUND_HOVER}: var(${GREEN[50]});
    }
  }
`;
