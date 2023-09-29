import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  container: {
    text: '--color__popover__container__text__default',
    background: '--color__popover__container__background__default',
    border: '--color__popover__container__border__default',
    shadow: '--color__popover__container__shadow__default',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.container.text}: var(${GREY[800]});
      ${COLORS.container.background}: var(${GREY[0]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.container.shadow}: drop-shadow(0, 4px, 15px, rgba(0, 0, 0, 15%));
      ${COLORS.container.border}: transparent;
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.container.text}: var(${GREY[100]});
      ${COLORS.container.background}: var(${GREY[800]});
      ${COLORS.container.shadow}: none;
      ${COLORS.container.border}: var(${WHITE_ALFA[4]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.container.text}: var(${GREY[800]});
      ${COLORS.container.background}: var(${GREY[0]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.container.shadow}: drop-shadow(0, 4px, 15px, rgba(0, 0, 0, 15%));
      ${COLORS.container.border}: transparent;
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.container.text}: var(${GREY[100]});
      ${COLORS.container.background}: var(${GREY[800]});
      ${COLORS.container.shadow}: none;
      ${COLORS.container.border}: var(${WHITE_ALFA[4]});
    }
  }
`;
