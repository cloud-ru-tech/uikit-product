import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  SELECT_TEXT: '--color-datepicker-select-text',
  SELECT_TEXT_HOVER: '--color-datepicker-select-text-hover',
  SELECT_TEXT_SELECTED: '--color-datepicker-select-text-selected',
  SELECT_TEXT_DISABLED: '--color-datepicker-select-text-disabled',

  SELECT_BACKGROUND: '--color-datepicker-select-bg',
  SELECT_BACKGROUND_HOVER: '--color-datepicker-select-bg-hover',
  SELECT_BACKGROUND_SELECTED: '--color-datepicker-select-bg-selected',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.SELECT_TEXT}: var(${GREY[600]});
      ${COLORS.SELECT_TEXT_HOVER}: var(${GREY[600]});
      ${COLORS.SELECT_TEXT_SELECTED}: var(${GREY[600]});
      ${COLORS.SELECT_TEXT_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.SELECT_BACKGROUND}: var(${GREY[0]});
      ${COLORS.SELECT_BACKGROUND_HOVER}: var(${BLACK_ALFA[4]});
      ${COLORS.SELECT_BACKGROUND_SELECTED}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.SELECT_TEXT}: var(${GREY[100]});
      ${COLORS.SELECT_TEXT_HOVER}: var(${GREY[0]});
      ${COLORS.SELECT_TEXT_SELECTED}: var(${GREY[0]});
      ${COLORS.SELECT_TEXT_DISABLED}: var(${GREY[600]});

      ${COLORS.SELECT_BACKGROUND}: var(${GREY[800]});
      ${COLORS.SELECT_BACKGROUND_HOVER}: var(${GREY[750]});
      ${COLORS.SELECT_BACKGROUND_SELECTED}: var(${GREY[700]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.SELECT_TEXT}: var(${GREY[600]});
      ${COLORS.SELECT_TEXT_HOVER}: var(${GREY[600]});
      ${COLORS.SELECT_TEXT_SELECTED}: var(${GREY[600]});
      ${COLORS.SELECT_TEXT_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.SELECT_BACKGROUND}: var(${GREY[0]});
      ${COLORS.SELECT_BACKGROUND_HOVER}: var(${BLACK_ALFA[4]});
      ${COLORS.SELECT_BACKGROUND_SELECTED}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.SELECT_TEXT}: var(${GREY[100]});
      ${COLORS.SELECT_TEXT_HOVER}: var(${GREY[0]});
      ${COLORS.SELECT_TEXT_SELECTED}: var(${GREY[0]});
      ${COLORS.SELECT_TEXT_DISABLED}: var(${GREY[600]});

      ${COLORS.SELECT_BACKGROUND}: var(${GREY[800]});
      ${COLORS.SELECT_BACKGROUND_HOVER}: var(${GREY[750]});
      ${COLORS.SELECT_BACKGROUND_SELECTED}: var(${GREY[700]});
    }
  }
`;
