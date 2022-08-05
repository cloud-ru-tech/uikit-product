import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  fill: {
    icon: {
      MLSpaceText: '--color-predefined-ml-space-logo-text',
      MLSpaceAbbr: '--color-predefined-ml-space-logo-abbr',
      CloudText: '--color-predefined-cloud-logo-text',
      CloudIcon: '--color-predefined-cloud-logo-icon',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.fill.icon.MLSpaceText}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.MLSpaceAbbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.CloudText}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.CloudIcon}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.fill.icon.MLSpaceText}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.MLSpaceAbbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.CloudText}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.CloudIcon}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.fill.icon.MLSpaceText}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.MLSpaceAbbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.CloudText}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.CloudIcon}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.fill.icon.MLSpaceText}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.MLSpaceAbbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.CloudText}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.CloudIcon}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;
