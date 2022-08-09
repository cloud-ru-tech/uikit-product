import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, PURPLE, BERRY_RED, GREEN } = EXPORT_VARS;

export const COLORS = {
  step: {
    label: {
      inactive: '--color__stepper__step__label__inactive',
      active: '--color__stepper__step__label__active',
    },
    background: {
      inactive: '--color__stepper__step__background__inactive',
      active: '--color__stepper__step__background__active',
      error: '--color__stepper__step__background__error',
    },
    indicator: '--color__stepper__step__indicator',
  },
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme=${Themes.Purple}] {
      ${COLORS.step.background.inactive}: var(${GREY[350]});
      ${COLORS.step.label.inactive}: var(${GREY[600]});
      ${COLORS.step.background.active}: var(${PURPLE[100]});
      ${COLORS.step.label.active}: var(${PURPLE[100]});
      ${COLORS.step.background.error}: var(${BERRY_RED[100]});
      ${COLORS.step.indicator}: var(${GREY[0]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.PurpleDark}] {
      ${COLORS.step.background.inactive}: var(${GREY[500]});
      ${COLORS.step.label.inactive}: var(${GREY[300]});
      ${COLORS.step.background.active}: var(${PURPLE[50]});
      ${COLORS.step.label.active}: var(${PURPLE[50]});
      ${COLORS.step.background.error}: var(${BERRY_RED[75]});
      ${COLORS.step.indicator}: var(${GREY[900]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme=${Themes.Green}] {
      ${COLORS.step.background.inactive}: var(${GREY[350]});
      ${COLORS.step.label.inactive}: var(${GREY[600]});
      ${COLORS.step.background.active}: var(${GREEN[100]});
      ${COLORS.step.label.active}: var(${GREEN[125]});
      ${COLORS.step.background.error}: var(${BERRY_RED[100]});
      ${COLORS.step.indicator}: var(${GREY[0]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.GreenDark}] {
      ${COLORS.step.background.inactive}: var(${GREY[500]});
      ${COLORS.step.label.inactive}: var(${GREY[300]});
      ${COLORS.step.background.active}: var(${GREEN[100]});
      ${COLORS.step.label.active}: var(${GREEN[100]});
      ${COLORS.step.background.error}: var(${BERRY_RED[75]});
      ${COLORS.step.indicator}: var(${GREY[900]});
    }
  }
`;
