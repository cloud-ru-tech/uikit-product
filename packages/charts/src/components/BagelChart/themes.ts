import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLACK_ALFA, WHITE_ALFA, BERRY_RED, SUNNY_YELLOW, EMERALD_GREEN } = EXPORT_VARS;

export const COLORS = {
  svg: {
    text: {
      limit: '--color__charts__bagel-chart__text-limit',
      value: '--color__charts__bagel-chart__text-value',
    },
    segment: {
      inactive: '--color__charts__bagel-chart__segment__inactive',
      red: '--color__charts__bagel-chart__segment__red',
      yellow: '--color__charts__bagel-chart__segment__yellow',
      green: '--color__charts__bagel-chart__segment__green',
      grey: '--color__charts__bagel-chart__segment__grey',
    },
  },
  chart: {
    title: '--color__charts__bagel-chart__title-text',
    icon: '--color__charts__bagel-chart__title-icon',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.svg.text.value}: var(${GREY[850]});
      ${COLORS.svg.text.limit}: var(${GREY[350]});
      ${COLORS.chart.title}: var(${GREY[350]});
      ${COLORS.chart.icon}: var(${GREY[400]});
      ${COLORS.svg.segment.inactive}: var(${BLACK_ALFA[8]});
      ${COLORS.svg.segment.red}: var(${BERRY_RED[100]});
      ${COLORS.svg.segment.yellow}: var(${SUNNY_YELLOW[100]});
      ${COLORS.svg.segment.green}: var(${EMERALD_GREEN[100]});
      ${COLORS.svg.segment.grey}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.svg.text.value}: var(${GREY[850]});
      ${COLORS.svg.text.limit}: var(${GREY[350]});
      ${COLORS.chart.title}: var(${GREY[350]});
      ${COLORS.chart.icon}: var(${GREY[400]});
      ${COLORS.svg.segment.inactive}: var(${BLACK_ALFA[8]});
      ${COLORS.svg.segment.red}: var(${BERRY_RED[100]});
      ${COLORS.svg.segment.yellow}: var(${SUNNY_YELLOW[100]});
      ${COLORS.svg.segment.green}: var(${EMERALD_GREEN[100]});
      ${COLORS.svg.segment.grey}: var(${BLACK_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.svg.text.value}: var(${GREY[0]});
      ${COLORS.svg.text.limit}: var(${GREY[500]});
      ${COLORS.chart.title}: var(${GREY[500]});
      ${COLORS.chart.icon}: var(${GREY[200]});
      ${COLORS.svg.segment.inactive}: var(${WHITE_ALFA[8]});
      ${COLORS.svg.segment.red}: var(${BERRY_RED[100]});
      ${COLORS.svg.segment.yellow}: var(${SUNNY_YELLOW[100]});
      ${COLORS.svg.segment.green}: var(${EMERALD_GREEN[100]});
      ${COLORS.svg.segment.grey}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.svg.text.value}: var(${GREY[0]});
      ${COLORS.svg.text.limit}: var(${GREY[500]});
      ${COLORS.chart.title}: var(${GREY[500]});
      ${COLORS.chart.icon}: var(${GREY[200]});
      ${COLORS.svg.segment.inactive}: var(${WHITE_ALFA[8]});
      ${COLORS.svg.segment.red}: var(${BERRY_RED[100]});
      ${COLORS.svg.segment.yellow}: var(${SUNNY_YELLOW[100]});
      ${COLORS.svg.segment.green}: var(${EMERALD_GREEN[100]});
      ${COLORS.svg.segment.grey}: var(${WHITE_ALFA[8]});
    }
  }
`;
