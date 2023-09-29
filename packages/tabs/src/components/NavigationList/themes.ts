import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  shadow: {
    active: '--color-tabs__navigation-list__shadow-box__active',
    transparent: '--color-tabs__navigation-list__shadow-box__transparent',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.shadow.active}: var(${EXPORT_VARS.BLUE_GREY[5]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.shadow.transparent}: rgba(255, 255, 255, 0%);
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.shadow.active}: var(${EXPORT_VARS.GREY[800]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.shadow.transparent}: rgba(0, 0, 0, 0%);
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.shadow.active}: var(${EXPORT_VARS.BLUE_GREY[5]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.shadow.transparent}: rgba(255, 255, 255, 0%);
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.shadow.active}: var(${EXPORT_VARS.GREY[800]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.shadow.transparent}: rgba(0, 0, 0, 0%);
    }
  }
`;
