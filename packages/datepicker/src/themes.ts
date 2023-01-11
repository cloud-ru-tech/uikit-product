import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, PURPLE, GREEN, BLACK_ALFA, BERRY_RED, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  INPUT_BACKGROUND: '--color-datepicker-input-bg',
  INPUT_BACKGROUND_FOCUS: '--color-datepicker-input-bg-focus',
  INPUT_BACKGROUND_HOVER: '--color-datepicker-input-bg-hover',

  INPUT_BORDER: '--color-datepicker-input-border',
  INPUT_BORDER_FOCUS: '--color-datepicker-input-border-focus',
  INPUT_BORDER_HOVER: '--color-datepicker-input-border-hover',

  INPUT_PLACEHOLDER_HOVER: '--color-datepicker-input-placeholder-hover',

  INPUT_ERROR: '--color-datepicker-input-error',
  INPUT_ERROR_BORDER: '--color-datepicker-input-error-border',

  DATE_INPUT_ICON_FILL: '--color-datepicker-date-input-icon-fill',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.INPUT_BACKGROUND}: var(${GREY[0]});
      ${COLORS.INPUT_BACKGROUND_FOCUS}: var(${GREY[0]});
      ${COLORS.INPUT_BACKGROUND_HOVER}: var(${GREY[0]});
      ${COLORS.INPUT_BORDER}: var(${BLACK_ALFA[16]});
      ${COLORS.INPUT_BORDER_FOCUS}: var(${PURPLE[100]});
      ${COLORS.INPUT_BORDER_HOVER}: var(${PURPLE[50]});

      ${COLORS.INPUT_ERROR}: var(${BERRY_RED[100]});
      ${COLORS.INPUT_ERROR_BORDER}: var(${BERRY_RED[100]});

      ${COLORS.DATE_INPUT_ICON_FILL}: var(${GREY[200]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.INPUT_BACKGROUND}: var(${GREY[800]});
      ${COLORS.INPUT_BACKGROUND_FOCUS}: var(${GREY[800]});
      ${COLORS.INPUT_BACKGROUND_HOVER}: var(${GREY[800]});

      ${COLORS.INPUT_BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.INPUT_BORDER_FOCUS}: var(${PURPLE[75]});
      ${COLORS.INPUT_BORDER_HOVER}: var(${PURPLE[50]});

      ${COLORS.INPUT_ERROR}: var(${BERRY_RED[75]});
      ${COLORS.INPUT_ERROR_BORDER}: var(${BERRY_RED[75]});

      ${COLORS.DATE_INPUT_ICON_FILL}: var(${GREY[450]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.INPUT_BACKGROUND}: var(${GREY[0]});
      ${COLORS.INPUT_BACKGROUND_FOCUS}: var(${GREY[0]});
      ${COLORS.INPUT_BACKGROUND_HOVER}: var(${GREY[0]});
      ${COLORS.INPUT_BORDER}: var(${BLACK_ALFA[16]});
      ${COLORS.INPUT_BORDER_FOCUS}: var(${GREEN[100]});
      ${COLORS.INPUT_BORDER_HOVER}: var(${GREEN[50]});

      ${COLORS.INPUT_ERROR}: var(${BERRY_RED[100]});
      ${COLORS.INPUT_ERROR_BORDER}: var(${BERRY_RED[100]});

      ${COLORS.DATE_INPUT_ICON_FILL}: var(${GREY[200]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.INPUT_BACKGROUND}: var(${GREY[800]});
      ${COLORS.INPUT_BACKGROUND_FOCUS}: var(${GREY[800]});
      ${COLORS.INPUT_BACKGROUND_HOVER}: var(${GREY[800]});

      ${COLORS.INPUT_BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.INPUT_BORDER_FOCUS}: var(${GREEN[75]});
      ${COLORS.INPUT_BORDER_HOVER}: var(${GREEN[50]});

      ${COLORS.INPUT_ERROR}: var(${BERRY_RED[75]});
      ${COLORS.INPUT_ERROR_BORDER}: var(${BERRY_RED[75]});

      ${COLORS.DATE_INPUT_ICON_FILL}: var(${GREY[450]});
    }
  }
`;
