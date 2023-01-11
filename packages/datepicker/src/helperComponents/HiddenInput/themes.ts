import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY } = EXPORT_VARS;

export const COLORS = {
  INPUT_EDITABLE_TEXT: '--color-datepicker-input-editable-text',
  INPUT_EDITABLE_BACKGROUND: '--color-datepicker-input-editable-bg',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.INPUT_EDITABLE_TEXT}: var(${GREY[0]});
      ${COLORS.INPUT_EDITABLE_BACKGROUND}: #0078d7;
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.INPUT_EDITABLE_TEXT}: var(${GREY[0]});
      ${COLORS.INPUT_EDITABLE_BACKGROUND}: #0078d7;
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.INPUT_EDITABLE_TEXT}: var(${GREY[0]});
      ${COLORS.INPUT_EDITABLE_BACKGROUND}: #0078d7;
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.INPUT_EDITABLE_TEXT}: var(${GREY[0]});
      ${COLORS.INPUT_EDITABLE_BACKGROUND}: #0078d7;
    }
  }
`;
