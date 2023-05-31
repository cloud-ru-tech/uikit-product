import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  custom: {
    fill: '--color__predefined-decor-icon__custom__fill',
    background: '--color__predefined-decor-icon__custom__background',
  },
  predefined: {
    background: {
      info: '--color__predefined-decor-icon__predefined__background__info',
      success: '--color__predefined-decor-icon__predefined__background__success',
      attentionCritical: '--color__predefined-decor-icon__predefined__background__attention-critical',
      attentionWarning: '--color__predefined-decor-icon__predefined__background__attention-warning',
      failed: '--color__predefined-decor-icon__predefined__background__failed',
      cancel: '--color__predefined-decor-icon__predefined__background__cancel',
      loading: '--color__predefined-decor-icon__predefined__background__loading',
    },
    fill: {
      info: '--color__predefined-decor-icon__predefined__fill__info',
      success: '--color__predefined-decor-icon__predefined__fill__success',
      attentionCritical: '--color__predefined-decor-icon__predefined__fill__attention-critical',
      attentionWarning: '--color__predefined-decor-icon__predefined__fill__attention-warning',
      failed: '--color__predefined-decor-icon__predefined__fill__failed',
      cancel: '--color__predefined-decor-icon__predefined__fill__cancel',
      loading: '--color__predefined-decor-icon__predefined__fill__loading',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.custom.fill}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.custom.background}: var(${EXPORT_VARS.PURPLE_ALFA[8]});

      ${COLORS.predefined.background.info}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.predefined.background.success}: var(${EXPORT_VARS.EMERALD_GREEN_ALPHA[15]});
      ${COLORS.predefined.background.attentionCritical}: var(${EXPORT_VARS.BERRY_RED_ALPHA[15]});
      ${COLORS.predefined.background.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.predefined.background.failed}: var(${EXPORT_VARS.BERRY_RED_ALPHA[15]});
      ${COLORS.predefined.background.cancel}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.predefined.background.loading}: var(${EXPORT_VARS.BLACK_ALFA[8]});

      ${COLORS.predefined.fill.info}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.predefined.fill.success}: var(${EXPORT_VARS.EMERALD_GREEN[100]});
      ${COLORS.predefined.fill.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.predefined.fill.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[100]});
      ${COLORS.predefined.fill.failed}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.predefined.fill.cancel}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.predefined.fill.loading}: var(${EXPORT_VARS.BLACK_ALFA[48]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.custom.fill}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.custom.background}: var(${EXPORT_VARS.PURPLE_ALFA[24]});

      ${COLORS.predefined.background.info}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.predefined.background.success}: var(${EXPORT_VARS.EMERALD_GREEN_ALPHA[15]});
      ${COLORS.predefined.background.attentionCritical}: var(${EXPORT_VARS.BERRY_RED_ALPHA[15]});
      ${COLORS.predefined.background.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.predefined.background.failed}: var(${EXPORT_VARS.BERRY_RED_ALPHA[15]});
      ${COLORS.predefined.background.cancel}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.predefined.background.loading}: var(${EXPORT_VARS.WHITE_ALFA[8]});

      ${COLORS.predefined.fill.info}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.predefined.fill.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.predefined.fill.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.predefined.fill.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[75]});
      ${COLORS.predefined.fill.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.predefined.fill.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.predefined.fill.loading}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.custom.fill}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.custom.background}: var(${EXPORT_VARS.BLACK_ALFA[4]});

      ${COLORS.predefined.background.info}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.predefined.background.success}: var(${EXPORT_VARS.EMERALD_GREEN_ALPHA[15]});
      ${COLORS.predefined.background.attentionCritical}: var(${EXPORT_VARS.BERRY_RED_ALPHA[15]});
      ${COLORS.predefined.background.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.predefined.background.failed}: var(${EXPORT_VARS.BERRY_RED_ALPHA[15]});
      ${COLORS.predefined.background.cancel}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.predefined.background.loading}: var(${EXPORT_VARS.BLACK_ALFA[8]});

      ${COLORS.predefined.fill.info}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.predefined.fill.success}: var(${EXPORT_VARS.EMERALD_GREEN[100]});
      ${COLORS.predefined.fill.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.predefined.fill.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[100]});
      ${COLORS.predefined.fill.failed}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.predefined.fill.cancel}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.predefined.fill.loading}: var(${EXPORT_VARS.BLACK_ALFA[48]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.custom.fill}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.custom.background}: var(${EXPORT_VARS.WHITE_ALFA[8]});

      ${COLORS.predefined.background.info}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.predefined.background.success}: var(${EXPORT_VARS.EMERALD_GREEN_ALPHA[15]});
      ${COLORS.predefined.background.attentionCritical}: var(${EXPORT_VARS.BERRY_RED_ALPHA[15]});
      ${COLORS.predefined.background.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.predefined.background.failed}: var(${EXPORT_VARS.BERRY_RED_ALPHA[15]});
      ${COLORS.predefined.background.cancel}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.predefined.background.loading}: var(${EXPORT_VARS.WHITE_ALFA[8]});

      ${COLORS.predefined.fill.info}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.predefined.fill.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.predefined.fill.attentionCritical}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.predefined.fill.attentionWarning}: var(${EXPORT_VARS.SUNNY_YELLOW[75]});
      ${COLORS.predefined.fill.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.predefined.fill.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.predefined.fill.loading}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;
