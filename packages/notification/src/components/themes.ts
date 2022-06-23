import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const {
  WHITE_ALFA,
  BLUE_GREY,
  GREY,
  PURPLE,
  GREEN,
  BERRY_RED,
  BERRY_RED_ALPHA,
  EMERALD_GREEN,
  EMERALD_GREEN_ALPHA,
  SUNNY_YELLOW,
  SUNNY_YELLOW_ALPHA,
} = EXPORT_VARS;

export const COLORS = {
  container: {
    background: {
      info: '--color-notification__container__background__info',
      alarm: '--color-notification__container__background__alarm',
    },
    border: {
      info: '--color-notification__container__border__info',
      alarm: '--color-notification__container__border__alarm',
    },
  },
  icon: {
    info: {
      fill: '--color-notification__icon__info__fill',
      background: '--color-notification__icon__info__background',
    },
    success: {
      fill: '--color-notification__icon__success__fill',
      background: '--color-notification__icon__success__background',
    },
    warning: {
      fill: '--color-notification__icon__warning__fill',
      background: '--color-notification__icon__warning__background',
    },
    warningCritical: {
      fill: '--color-notification__icon__warning-critical__fill',
      background: '--color-notification__icon__warning-critical__background',
    },
    warningAlarm: {
      fill: '--color-notification__icon__warning-alarm__fill',
      background: '--color-notification__icon__warning-alarm__background',
    },
    error: {
      fill: '--color-notification__icon__error__fill',
      background: '--color-notification__icon__error__background',
    },
    errorAlarm: {
      fill: '--color-notification__icon__error-alarm__fill',
      background: '--color-notification__icon__error-alarm__background',
    },
  },
  action: {
    info: {
      default: '--color-notification__action__info__default',
      hover: '--color-notification__action__info__hover',
    },
    alarm: {
      default: '--color-notification__action__alarm__default',
      hover: '--color-notification__action__alarm__hover',
    },
  },
  title: {
    info: '--color-notification__title__info',
    alarm: '--color-notification__title__alarm',
  },
  description: '--color-notification__description',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.container.background.info}: var(${BLUE_GREY[90]});
      ${COLORS.container.background.alarm}: var(${BERRY_RED[115]});
      ${COLORS.container.border.info}: var(${BLUE_GREY[90]});
      ${COLORS.container.border.alarm}: var(${BERRY_RED[115]});

      ${COLORS.icon.info.fill}: var(${GREY[0]});
      ${COLORS.icon.info.background}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.success.fill}: var(${EMERALD_GREEN[75]});
      ${COLORS.icon.success.background}: var(${EMERALD_GREEN_ALPHA[25]});
      ${COLORS.icon.warning.fill}: var(${SUNNY_YELLOW[75]});
      ${COLORS.icon.warning.background}: var(${SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.icon.warningCritical.fill}: var(${BERRY_RED[75]});
      ${COLORS.icon.warningCritical.background}: var(${BERRY_RED_ALPHA[25]});
      ${COLORS.icon.warningAlarm.fill}: var(${GREY[0]});
      ${COLORS.icon.warningAlarm.background}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.error.fill}: var(${BERRY_RED[75]});
      ${COLORS.icon.error.background}: var(${BERRY_RED_ALPHA[25]});
      ${COLORS.icon.errorAlarm.fill}: var(${GREY[0]});
      ${COLORS.icon.errorAlarm.background}: var(${WHITE_ALFA[16]});

      ${COLORS.action.info.default}: var(${PURPLE[50]});
      ${COLORS.action.info.hover}: var(${PURPLE[25]});
      ${COLORS.action.alarm.default}: var(${GREY[0]});
      ${COLORS.action.alarm.hover}: var(${GREY[0]});

      ${COLORS.title.info}: var(${GREY[100]});
      ${COLORS.title.alarm}: var(${GREY[0]});
      ${COLORS.description}: var(${GREY[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.container.background.info}: var(${BLUE_GREY[80]});
      ${COLORS.container.background.alarm}: var(${BERRY_RED[115]});
      ${COLORS.container.border.info}: var(${BLUE_GREY[70]});
      ${COLORS.container.border.alarm}: var(${BERRY_RED[115]});

      ${COLORS.icon.info.fill}: var(${GREY[0]});
      ${COLORS.icon.info.background}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.success.fill}: var(${EMERALD_GREEN[75]});
      ${COLORS.icon.success.background}: var(${EMERALD_GREEN_ALPHA[25]});
      ${COLORS.icon.warning.fill}: var(${SUNNY_YELLOW[75]});
      ${COLORS.icon.warning.background}: var(${SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.icon.warningCritical.fill}: var(${BERRY_RED[75]});
      ${COLORS.icon.warningCritical.background}: var(${BERRY_RED_ALPHA[25]});
      ${COLORS.icon.warningAlarm.fill}: var(${GREY[0]});
      ${COLORS.icon.warningAlarm.background}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.error.fill}: var(${BERRY_RED[75]});
      ${COLORS.icon.error.background}: var(${BERRY_RED_ALPHA[25]});
      ${COLORS.icon.errorAlarm.fill}: var(${GREY[0]});
      ${COLORS.icon.errorAlarm.background}: var(${WHITE_ALFA[16]});

      ${COLORS.action.info.default}: var(${PURPLE[50]});
      ${COLORS.action.info.hover}: var(${PURPLE[25]});
      ${COLORS.action.alarm.default}: var(${GREY[0]});
      ${COLORS.action.alarm.hover}: var(${GREY[0]});

      ${COLORS.title.info}: var(${GREY[100]});
      ${COLORS.title.alarm}: var(${GREY[0]});
      ${COLORS.description}: var(${GREY[100]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.container.background.info}: var(${BLUE_GREY[90]});
      ${COLORS.container.background.alarm}: var(${BERRY_RED[115]});
      ${COLORS.container.border.info}: var(${BLUE_GREY[90]});
      ${COLORS.container.border.alarm}: var(${BERRY_RED[115]});

      ${COLORS.icon.info.fill}: var(${GREY[0]});
      ${COLORS.icon.info.background}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.success.fill}: var(${EMERALD_GREEN[75]});
      ${COLORS.icon.success.background}: var(${EMERALD_GREEN_ALPHA[25]});
      ${COLORS.icon.warning.fill}: var(${SUNNY_YELLOW[75]});
      ${COLORS.icon.warning.background}: var(${SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.icon.warningCritical.fill}: var(${BERRY_RED[75]});
      ${COLORS.icon.warningCritical.background}: var(${BERRY_RED_ALPHA[25]});
      ${COLORS.icon.warningAlarm.fill}: var(${GREY[0]});
      ${COLORS.icon.warningAlarm.background}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.error.fill}: var(${BERRY_RED[75]});
      ${COLORS.icon.error.background}: var(${BERRY_RED_ALPHA[25]});
      ${COLORS.icon.errorAlarm.fill}: var(${GREY[0]});
      ${COLORS.icon.errorAlarm.background}: var(${WHITE_ALFA[16]});

      ${COLORS.action.info.default}: var(${GREEN[100]});
      ${COLORS.action.info.hover}: var(${GREEN[25]});
      ${COLORS.action.alarm.default}: var(${GREY[0]});
      ${COLORS.action.alarm.hover}: var(${GREY[0]});

      ${COLORS.title.info}: var(${GREY[100]});
      ${COLORS.title.alarm}: var(${GREY[0]});
      ${COLORS.description}: var(${GREY[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.container.background.info}: var(${BLUE_GREY[80]});
      ${COLORS.container.background.alarm}: var(${BERRY_RED[115]});
      ${COLORS.container.border.info}: var(${BLUE_GREY[70]});
      ${COLORS.container.border.alarm}: var(${BERRY_RED[115]});

      ${COLORS.icon.info.fill}: var(${GREY[0]});
      ${COLORS.icon.info.background}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.success.fill}: var(${EMERALD_GREEN[75]});
      ${COLORS.icon.success.background}: var(${EMERALD_GREEN_ALPHA[25]});
      ${COLORS.icon.warning.fill}: var(${SUNNY_YELLOW[75]});
      ${COLORS.icon.warning.background}: var(${SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.icon.warningCritical.fill}: var(${BERRY_RED[75]});
      ${COLORS.icon.warningCritical.background}: var(${BERRY_RED_ALPHA[25]});
      ${COLORS.icon.warningAlarm.fill}: var(${GREY[0]});
      ${COLORS.icon.warningAlarm.background}: var(${WHITE_ALFA[16]});
      ${COLORS.icon.error.fill}: var(${BERRY_RED[75]});
      ${COLORS.icon.error.background}: var(${BERRY_RED_ALPHA[25]});
      ${COLORS.icon.errorAlarm.fill}: var(${GREY[0]});
      ${COLORS.icon.errorAlarm.background}: var(${WHITE_ALFA[16]});

      ${COLORS.action.info.default}: var(${GREEN[100]});
      ${COLORS.action.info.hover}: var(${GREEN[25]});
      ${COLORS.action.alarm.default}: var(${GREY[0]});
      ${COLORS.action.alarm.hover}: var(${GREY[0]});

      ${COLORS.title.info}: var(${GREY[100]});
      ${COLORS.title.alarm}: var(${GREY[0]});
      ${COLORS.description}: var(${GREY[100]});
    }
  }
`;
