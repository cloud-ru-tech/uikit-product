import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLUE_GREY, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: '--color__navigation__sidebar__background',
  border: '--color__navigation__sidebar__border',
  heading: '--color__navigation__sidebar__heading',
  listFading: '--color__navigation__sidebar__list-fading',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background}: var(${BLUE_GREY[5]});
      ${COLORS.heading}: var(${GREY[200]});
      ${COLORS.border}: var(${BLACK_ALFA[8]});
      ${COLORS.listFading}: linear-gradient(180deg, rgba(244, 244, 245, 0) 0%, var(${BLUE_GREY[5]}) 100%);
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background}: var(${GREY[900]});
      ${COLORS.heading}: var(${GREY[700]});
      ${COLORS.border}: var(${WHITE_ALFA[16]});
      ${COLORS.listFading}: linear-gradient(180deg, rgba(26, 26, 26, 0) 0%, var(${GREY[900]}) 100%);
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background}: var(${BLUE_GREY[5]});
      ${COLORS.heading}: var(${GREY[200]});
      ${COLORS.border}: var(${BLACK_ALFA[8]});
      ${COLORS.listFading}: linear-gradient(180deg, rgba(244, 244, 245, 0) 0%, var(${BLUE_GREY[5]}) 100%);
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background}: var(${GREY[900]});
      ${COLORS.heading}: var(${GREY[700]});
      ${COLORS.border}: var(${WHITE_ALFA[16]});
      ${COLORS.listFading}: linear-gradient(180deg, rgba(26, 26, 26, 0) 0%, var(${GREY[900]}) 100%);
    }
  }
`;
