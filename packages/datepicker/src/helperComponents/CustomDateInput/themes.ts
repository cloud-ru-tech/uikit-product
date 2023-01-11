import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BERRY_RED } = EXPORT_VARS;

export const COLORS = {
  INPUT_ERROR: '--color-datepicker-input-error',
  INPUT_ERROR_BORDER: '--color-datepicker-input-error-border',

  DATE_INPUT_ICON_FILL: '--color-datepicker-date-input-icon-fill',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.INPUT_ERROR}: var(${BERRY_RED[100]});
      ${COLORS.INPUT_ERROR_BORDER}: var(${BERRY_RED[100]});

      ${COLORS.DATE_INPUT_ICON_FILL}: var(${GREY[200]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.INPUT_ERROR}: var(${BERRY_RED[75]});
      ${COLORS.INPUT_ERROR_BORDER}: var(${BERRY_RED[75]});

      ${COLORS.DATE_INPUT_ICON_FILL}: var(${GREY[450]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.INPUT_ERROR}: var(${BERRY_RED[100]});
      ${COLORS.INPUT_ERROR_BORDER}: var(${BERRY_RED[100]});

      ${COLORS.DATE_INPUT_ICON_FILL}: var(${GREY[200]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.INPUT_ERROR}: var(${BERRY_RED[75]});
      ${COLORS.INPUT_ERROR_BORDER}: var(${BERRY_RED[75]});

      ${COLORS.DATE_INPUT_ICON_FILL}: var(${GREY[450]});
    }
  }
`;
