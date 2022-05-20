import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  fill: {
    icon: {
      MLSpaceText: '--color-predefined-ml-space-logo-text',
      SberCloudText: '--color-predefined-sbercloud-logo-text',
      SberCloudIcon: '--color-predefined-sbercloud-logo-icon',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.fill.icon.MLSpaceText}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.SberCloudText}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.SberCloudIcon}: var(${EXPORT_VARS.BLUE_GREY[90]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.fill.icon.MLSpaceText}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.SberCloudText}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.SberCloudIcon}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.fill.icon.MLSpaceText}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.SberCloudText}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.SberCloudIcon}: var(${EXPORT_VARS.BLUE_GREY[90]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.fill.icon.MLSpaceText}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.SberCloudText}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.SberCloudIcon}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;
