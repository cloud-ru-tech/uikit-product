import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  TIME_INPUT_ICON_FILL: '--color-datepicker-time-input-icon-fill',
  TIME_INPUT_ICON_FILL_DISABLED: '--color-datepicker-time-input-icon-fill-disabled',
  TIME_INPUT_DISABLED: '--color-datepicker-time-input-disabled',
  TIME_INPUT_BACKGROUND_DISABLED: '--color-datepicker-time-input-bg-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.TIME_INPUT_ICON_FILL}: var(${GREY[200]});
      ${COLORS.TIME_INPUT_ICON_FILL_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.TIME_INPUT_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.TIME_INPUT_BACKGROUND_DISABLED}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.TIME_INPUT_ICON_FILL}: var(${GREY[450]});
      ${COLORS.TIME_INPUT_ICON_FILL_DISABLED}: var(${BLACK_ALFA[24]});
      ${COLORS.TIME_INPUT_DISABLED}: var(${BLACK_ALFA[24]});
      ${COLORS.TIME_INPUT_BACKGROUND_DISABLED}: var(${GREY[300]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.TIME_INPUT_ICON_FILL}: var(${GREY[200]});
      ${COLORS.TIME_INPUT_ICON_FILL_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.TIME_INPUT_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.TIME_INPUT_BACKGROUND_DISABLED}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.TIME_INPUT_ICON_FILL}: var(${GREY[450]});
      ${COLORS.TIME_INPUT_ICON_FILL_DISABLED}: var(${BLACK_ALFA[24]});
      ${COLORS.TIME_INPUT_DISABLED}: var(${BLACK_ALFA[24]});
      ${COLORS.TIME_INPUT_BACKGROUND_DISABLED}: var(${GREY[300]});
    }
  }
`;
