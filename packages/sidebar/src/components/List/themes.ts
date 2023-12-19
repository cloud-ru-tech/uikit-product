import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLUE_GREY, WHITE_ALFA, GREEN, PURPLE } = EXPORT_VARS;

export const COLORS = {
  heading: '--color__navigation__sidebar__heading',
  listFading: '--color__navigation__sidebar__list-fading',
  noDataLabel: '--color__navigation__sidebar__no-data__text',
  tooltipButton: '--color__navigation__sidebar__list-tooltip-button',
  tooltipButtonHover: '--color__navigation__sidebar__list-tooltip-button-hover',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.heading}: var(${GREY[200]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.listFading}: linear-gradient(180deg, rgba(244, 244, 245, 0%) 0%, var(${BLUE_GREY[5]}) 100%);
      ${COLORS.noDataLabel}: var(${GREY[350]});
      ${COLORS.tooltipButton}: var(${PURPLE[100]});
      ${COLORS.tooltipButtonHover}: var(${PURPLE[50]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.heading}: var(${GREY[700]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.listFading}: linear-gradient(180deg, rgba(26, 26, 26, 0%) 0%, var(${GREY[900]}) 100%);
      ${COLORS.noDataLabel}: var(${WHITE_ALFA[48]});
      ${COLORS.tooltipButton}: var(${PURPLE[100]});
      ${COLORS.tooltipButtonHover}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.heading}: var(${GREY[200]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.listFading}: linear-gradient(180deg, rgba(244, 244, 245, 0%) 0%, var(${BLUE_GREY[5]}) 100%);
      ${COLORS.noDataLabel}: var(${GREY[350]});
      ${COLORS.tooltipButton}: var(${GREEN[100]});
      ${COLORS.tooltipButtonHover}: var(${GREEN[50]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.heading}: var(${GREY[700]});
      /* stylelint-disable-next-line function-disallowed-list */
      ${COLORS.listFading}: linear-gradient(180deg, rgba(26, 26, 26, 0%) 0%, var(${GREY[900]}) 100%);
      ${COLORS.noDataLabel}: var(${WHITE_ALFA[48]});
      ${COLORS.tooltipButton}: var(${GREEN[100]});
      ${COLORS.tooltipButtonHover}: var(${GREEN[50]});
    }
  }
`;
