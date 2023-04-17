import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { BLACK_ALFA, PURPLE, GREEN } = EXPORT_VARS;

export const COLORS = {
  dot: '--color__carousel__navigation__dot',
  dotActive: '--color__carousel__navigation__dot__active',
};

export const LIGHT_THEMES = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.dot}: var(${BLACK_ALFA[16]});
      ${COLORS.dotActive}: var(${PURPLE[100]});
    }
    body[data-theme=${Themes.Green}] {
      ${COLORS.dot}: var(${BLACK_ALFA[16]});
      ${COLORS.dotActive}: var(${GREEN[100]});
    }
  }
`;

export const DARK_THEMES = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.dot}: var(${PURPLE[10]});
      ${COLORS.dotActive}: var(${PURPLE[100]});
    }
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.dot}: var(${GREEN[10]});
      ${COLORS.dotActive}: var(${GREEN[100]});
    }
  }
`;
