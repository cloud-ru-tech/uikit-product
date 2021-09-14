import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, PRESET, BLACK_ALFA, PURPLE } = EXPORT_VARS;

export const COLORS = {
  STEP_INACTIVE: '--color-stepper-step-inactive',
  INACTIVE_TEXT: '--color-stepper-inactive-text',
  STEP_ACTIVE: '--color-stepper-step-active',
  STEP_ERROR: '--color-stepper-step-error',
  STEP_CONTENT: '--color-stepper-step-content',
  BACKGROUND_ROW_EMPTY: '--color-stepper-background-row-empty',
  BACKGROUND_ROW_FILLED: '--color-stepper-background-row-filled',
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme=${Themes.Purple}] {
      ${COLORS.STEP_INACTIVE}: var(${GREY[350]});
      ${COLORS.INACTIVE_TEXT}: var(${GREY[600]});
      ${COLORS.STEP_ACTIVE}: var(${PURPLE[100]});
      ${COLORS.STEP_ERROR}: var(${PRESET.BERRY_RED_1});
      ${COLORS.STEP_CONTENT}: var(${GREY[0]});
      ${COLORS.BACKGROUND_ROW_EMPTY}: var(${BLACK_ALFA[8]});
      ${COLORS.BACKGROUND_ROW_FILLED}: var(${PURPLE[50]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.PurpleDark}] {
      ${COLORS.STEP_INACTIVE}: var(${GREY[350]});
      ${COLORS.INACTIVE_TEXT}: var(${GREY[600]});
      ${COLORS.STEP_ACTIVE}: var(${PURPLE[100]});
      ${COLORS.STEP_ERROR}: var(${PRESET.BERRY_RED_1});
      ${COLORS.STEP_CONTENT}: var(${GREY[0]});
      ${COLORS.BACKGROUND_ROW_EMPTY}: var(${BLACK_ALFA[8]});
      ${COLORS.BACKGROUND_ROW_FILLED}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme=${Themes.Green}] {
      ${COLORS.STEP_INACTIVE}: var(${GREY[350]});
      ${COLORS.INACTIVE_TEXT}: var(${GREY[600]});
      ${COLORS.STEP_ACTIVE}: var(${PURPLE[100]});
      ${COLORS.STEP_ERROR}: var(${PRESET.BERRY_RED_1});
      ${COLORS.STEP_CONTENT}: var(${GREY[0]});
      ${COLORS.BACKGROUND_ROW_EMPTY}: var(${BLACK_ALFA[8]});
      ${COLORS.BACKGROUND_ROW_FILLED}: var(${PURPLE[50]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.GreenDark}] {
      ${COLORS.STEP_INACTIVE}: var(${GREY[350]});
      ${COLORS.INACTIVE_TEXT}: var(${GREY[600]});
      ${COLORS.STEP_ACTIVE}: var(${PURPLE[100]});
      ${COLORS.STEP_ERROR}: var(${PRESET.BERRY_RED_1});
      ${COLORS.STEP_CONTENT}: var(${GREY[0]});
      ${COLORS.BACKGROUND_ROW_EMPTY}: var(${BLACK_ALFA[8]});
      ${COLORS.BACKGROUND_ROW_FILLED}: var(${PURPLE[50]});
    }
  }
`;
