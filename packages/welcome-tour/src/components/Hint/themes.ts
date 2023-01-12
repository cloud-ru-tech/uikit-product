import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  container: {
    heading: '--color__welcome-tour__heading',
    subheading: '--color__welcome-tour__subheading',
    background: '--color__welcome-tour__background',
    overlay: '--color__welcome-tour__overlay',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.container.heading}: var(${GREY[800]});
      ${COLORS.container.subheading}: var(${GREY[600]});
      ${COLORS.container.background}: var(${GREY[0]});
      ${COLORS.container.overlay}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.container.heading}: var(${GREY[100]});
      ${COLORS.container.subheading}: var(${GREY[0]});
      ${COLORS.container.background}: var(${GREY[800]});
      ${COLORS.container.overlay}: var(${BLACK_ALFA[48]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.container.heading}: var(${GREY[800]});
      ${COLORS.container.subheading}: var(${GREY[600]});
      ${COLORS.container.background}: var(${GREY[0]});
      ${COLORS.container.overlay}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.container.heading}: var(${GREY[100]});
      ${COLORS.container.subheading}: var(${GREY[0]});
      ${COLORS.container.background}: var(${GREY[800]});
      ${COLORS.container.overlay}: var(${BLACK_ALFA[48]});
    }
  }
`;
