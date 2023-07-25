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

// Unique colors for the new Cloud logo
const CLOUD_ICON_COLOR = '#00D97B';
const CLOUD_TEXT_COLOR = {
  light: '#222',
  dark: '#e7e7e7',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.fill.icon.onDefault.MLSpace.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onDefault.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.onDefault.Cloud.text}: ${CLOUD_TEXT_COLOR.light};
      ${COLORS.fill.icon.onDefault.Cloud.icon}: ${CLOUD_ICON_COLOR};

      ${COLORS.fill.icon.onAccent.MLSpace.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onAccent.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.onAccent.Cloud.text}: ${CLOUD_TEXT_COLOR.dark};
      ${COLORS.fill.icon.onAccent.Cloud.icon}: ${CLOUD_ICON_COLOR};
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.fill.icon.onDefault.MLSpace.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onDefault.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.onDefault.Cloud.text}: ${CLOUD_TEXT_COLOR.dark};
      ${COLORS.fill.icon.onDefault.Cloud.icon}: ${CLOUD_ICON_COLOR};

      ${COLORS.fill.icon.onAccent.MLSpace.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onAccent.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.onAccent.Cloud.text}: ${CLOUD_TEXT_COLOR.light};
      ${COLORS.fill.icon.onAccent.Cloud.icon}: ${CLOUD_ICON_COLOR};
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.fill.icon.onDefault.MLSpace.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onDefault.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.onDefault.Cloud.text}: ${CLOUD_TEXT_COLOR.light};
      ${COLORS.fill.icon.onDefault.Cloud.icon}: ${CLOUD_ICON_COLOR};

      ${COLORS.fill.icon.onAccent.MLSpace.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onAccent.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.onAccent.Cloud.text}: ${CLOUD_TEXT_COLOR.dark};
      ${COLORS.fill.icon.onAccent.Cloud.icon}: ${CLOUD_ICON_COLOR};
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.fill.icon.onDefault.MLSpace.text}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.icon.onDefault.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.fill.icon.onDefault.Cloud.text}: ${CLOUD_TEXT_COLOR.dark};
      ${COLORS.fill.icon.onDefault.Cloud.icon}: ${CLOUD_ICON_COLOR};

      ${COLORS.fill.icon.onAccent.MLSpace.text}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.fill.icon.onAccent.MLSpace.abbr}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.fill.icon.onAccent.Cloud.text}: ${CLOUD_TEXT_COLOR.light};
      ${COLORS.fill.icon.onAccent.Cloud.icon}: ${CLOUD_ICON_COLOR};
    }
  }
`;
