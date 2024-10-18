import { styled } from '@linaria/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  min-width: 100px;
  fill: var(${COLORS.chart.icon});
`;

export const TitleWrapper = styled.div`
  ${themeVars.sans.title.m};

  color: var(${COLORS.chart.title});
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

export const Value = styled.text`
  ${themeVars.sans.title.m};

  fill: var(${COLORS.svg.text.value});
  text-anchor: middle;
`;

export const Limit = styled.text`
  ${themeVars.sans.body.m};

  fill: var(${COLORS.svg.text.limit});
  text-anchor: middle;
`;
