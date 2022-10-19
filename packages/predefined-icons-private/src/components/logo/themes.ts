import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  fill: {
    icon: {
      onDefault: {
        MLSpace: {
          text: '--color-predefined-icons-private__ml-space-logo__text__on-default',
          abbr: '--color-predefined-icons-private__ml-space-logo__abbr__on-default',
        },
        Cloud: {
          text: '--color-predefined-icons-private__cloud-logo__text__on-default',
          icon: '--color-predefined-icons-private__cloud-logo__icon__on-default',
        },
      },
      onAccent: {
        MLSpace: {
          text: '--color-predefined-icons-private__ml-space-logo__text__on-accent',
          abbr: '--color-predefined-icons-private__ml-space-logo__abbr__on-accent',
        },
        Cloud: {
          text: '--color-predefined-icons-private__cloud-logo__text__on-accent',
          icon: '--color-predefined-icons-private__cloud-logo__icon__on-accent',
        },
      },
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.fill.icon.onDefault.MLSpace.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onDefault.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.onDefault.Cloud.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onDefault.Cloud.icon}: var(${EXPORT_VARS.GREEN[100]});

      ${COLORS.fill.icon.onAccent.MLSpace.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onAccent.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.onAccent.Cloud.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onAccent.Cloud.icon}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.fill.icon.onDefault.MLSpace.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onDefault.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.onDefault.Cloud.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onDefault.Cloud.icon}: var(${EXPORT_VARS.GREEN[100]});

      ${COLORS.fill.icon.onAccent.MLSpace.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onAccent.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.onAccent.Cloud.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onAccent.Cloud.icon}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.fill.icon.onDefault.MLSpace.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onDefault.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.onDefault.Cloud.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onDefault.Cloud.icon}: var(${EXPORT_VARS.GREEN[100]});

      ${COLORS.fill.icon.onAccent.MLSpace.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onAccent.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.onAccent.Cloud.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onAccent.Cloud.icon}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.fill.icon.onDefault.MLSpace.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onDefault.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.onDefault.Cloud.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onDefault.Cloud.icon}: var(${EXPORT_VARS.GREEN[100]});

      ${COLORS.fill.icon.onAccent.MLSpace.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onAccent.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.onAccent.Cloud.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onAccent.Cloud.icon}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;
