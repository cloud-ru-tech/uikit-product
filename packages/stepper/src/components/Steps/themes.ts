import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLACK_ALFA, WHITE_ALFA, PURPLE, BERRY_RED, GREEN } = EXPORT_VARS;

export const COLORS = {
  STEP_INACTIVE: '--color-stepper-step-inactive',
  INACTIVE_TEXT: '--color-stepper-inactive-text',
  STEP_ACTIVE: '--color-stepper-step-active',
  STEP_ACTIVE_TEXT: '--color-stepper-step-active-text',
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
      ${COLORS.STEP_ACTIVE_TEXT}: var(${PURPLE[100]});
      ${COLORS.STEP_ERROR}: var(${BERRY_RED[100]});
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
      ${COLORS.STEP_ACTIVE_TEXT}: var(${PURPLE[100]});
      ${COLORS.STEP_ERROR}: var(${BERRY_RED[100]});
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
      ${COLORS.STEP_ACTIVE}: var(${GREEN[100]});
      ${COLORS.STEP_ACTIVE_TEXT}: var(${GREEN[125]});
      ${COLORS.STEP_ERROR}: var(${BERRY_RED[100]});
      ${COLORS.STEP_CONTENT}: var(${GREY[0]});
      ${COLORS.BACKGROUND_ROW_EMPTY}: var(${BLACK_ALFA[8]});
      ${COLORS.BACKGROUND_ROW_FILLED}: var(${GREEN[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme=${Themes.GreenDark}] {
      ${COLORS.STEP_INACTIVE}: var(${GREY[500]});
      ${COLORS.INACTIVE_TEXT}: var(${GREY[300]});
      ${COLORS.STEP_ACTIVE}: var(${GREEN[100]});
      ${COLORS.STEP_ACTIVE_TEXT}: var(${GREEN[100]});
      ${COLORS.STEP_ERROR}: var(${BERRY_RED[75]});
      ${COLORS.STEP_CONTENT}: var(${GREY[900]});
      ${COLORS.BACKGROUND_ROW_EMPTY}: var(${WHITE_ALFA[16]});
      ${COLORS.BACKGROUND_ROW_FILLED}: var(${GREEN[100]});
    }
  }
`;
