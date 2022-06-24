import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  fill: {
    primary: {
      info: '--color-predefined-icon__info__primary',
      success: '--color-predefined-icon__success__primary',
      attentionCritical: '--color-predefined-icon__attention-critical__primary',
      attentionWarning: '--color-predefined-icon__attention-warning__primary',
      failed: '--color-predefined-icon__failed__primary',
      cancel: '--color-predefined-icon__cancel__primary',
      loading: '--color-predefined-icon__loading__primary',
    },
    onDark: {
      info: '--color-predefined-icon__info__on-dark',
      success: '--color-predefined-icon__success__on-dark',
      attentionCritical: '--color-predefined-icon__attention-critical__on-dark',
      attentionWarning: '--color-predefined-icon__attention-warning__on-dark',
      failed: '--color-predefined-icon__failed__on-dark',
      cancel: '--color-predefined-icon__cancel__on-dark',
      loading: '--color-predefined-icon__loading__on-dark',
    },
    onAccent: {
      info: '--color-predefined-icon__info__on-accent',
      success: '--color-predefined-icon__success__on-accent',
      attentionCritical: '--color-predefined-icon__attention-critical__on-accent',
      attentionWarning: '--color-predefined-icon__attention-warning__on-accent',
      failed: '--color-predefined-icon__failed__on-accent',
      cancel: '--color-predefined-icon__cancel__on-accent',
      loading: '--color-predefined-icon__loading__on-accent',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.fill.primary.info}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.primary.success}: var(${EXPORT_VARS.EMERALD_GREEN[100]});
      ${COLORS.fill.primary.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.fill.primary.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[100]});
      ${COLORS.fill.primary.failed}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.fill.primary.cancel}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.primary.loading}: var(${EXPORT_VARS.BLACK_ALFA[48]});

      ${COLORS.fill.onDark.info}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onDark.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDark.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[75]});
      ${COLORS.fill.onDark.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.cancel}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onDark.loading}: var(${EXPORT_VARS.GREY[0]});

      ${COLORS.fill.onAccent.info}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.success}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.attentionCritical}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.attentionWarning}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.failed}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.cancel}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.loading}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.fill.primary.info}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.primary.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.primary.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.primary.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[75]});
      ${COLORS.fill.primary.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.primary.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.primary.loading}: var(${EXPORT_VARS.GREY[0]});

      ${COLORS.fill.onDark.info}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onDark.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDark.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[75]});
      ${COLORS.fill.onDark.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.cancel}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onDark.loading}: var(${EXPORT_VARS.GREY[0]});

      ${COLORS.fill.onAccent.info}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.success}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.attentionCritical}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.attentionWarning}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.failed}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.cancel}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.loading}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.fill.primary.info}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.primary.success}: var(${EXPORT_VARS.EMERALD_GREEN[100]});
      ${COLORS.fill.primary.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.fill.primary.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[100]});
      ${COLORS.fill.primary.failed}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.fill.primary.cancel}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.primary.loading}: var(${EXPORT_VARS.BLACK_ALFA[48]});

      ${COLORS.fill.onDark.info}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onDark.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDark.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[75]});
      ${COLORS.fill.onDark.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.cancel}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onDark.loading}: var(${EXPORT_VARS.GREY[0]});

      ${COLORS.fill.onAccent.info}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.success}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.attentionCritical}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.attentionWarning}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.failed}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.cancel}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.loading}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.fill.primary.info}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.primary.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.primary.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.primary.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[75]});
      ${COLORS.fill.primary.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.primary.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.primary.loading}: var(${EXPORT_VARS.GREY[0]});

      ${COLORS.fill.onDark.info}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onDark.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDark.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[75]});
      ${COLORS.fill.onDark.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.cancel}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onDark.loading}: var(${EXPORT_VARS.GREY[0]});

      ${COLORS.fill.onAccent.info}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.success}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.attentionCritical}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.attentionWarning}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.failed}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.cancel}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.fill.onAccent.loading}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;
