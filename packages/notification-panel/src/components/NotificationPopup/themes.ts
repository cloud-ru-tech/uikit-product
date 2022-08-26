import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { BLACK_ALFA, WHITE_ALFA, GREY, PURPLE } = EXPORT_VARS;

export const COLORS = {
  background: '--color__notification__notification-popup__background',
  title: '--color__notification__notification-popup__title',
  divider: '--color__notification__notification-popup__divider',
  notify: '--color__notification__notification-popup__notify',
  footerText: '--color__notification__notification-popup__footer-text',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.title}: var(${GREY[800]});
      ${COLORS.divider}: var(${BLACK_ALFA[8]});
      ${COLORS.notify}: var(${PURPLE[100]});
      ${COLORS.footerText}: var(${BLACK_ALFA[48]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background}: var(${GREY[850]});
      ${COLORS.title}: var(${GREY[100]});
      ${COLORS.divider}: var(${WHITE_ALFA[8]});
      ${COLORS.notify}: var(${PURPLE[50]});
      ${COLORS.footerText}: var(${WHITE_ALFA[48]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.title}: var(${GREY[800]});
      ${COLORS.divider}: var(${BLACK_ALFA[8]});
      ${COLORS.notify}: var(${BLACK_ALFA[24]});
      ${COLORS.footerText}: var(${BLACK_ALFA[48]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background}: var(${GREY[850]});
      ${COLORS.title}: var(${GREY[100]});
      ${COLORS.divider}: var(${WHITE_ALFA[8]});
      ${COLORS.notify}: var(${WHITE_ALFA[48]});
      ${COLORS.footerText}: var(${WHITE_ALFA[48]});
    }
  }
`;
