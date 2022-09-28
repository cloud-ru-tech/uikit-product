import { styled } from '@linaria/react';

import { H4_SEMIBOLD_STYLES, H5_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

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
  ${H5_STYLES};
  color: var(${COLORS.chart.title});
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

export const Value = styled.text`
  fill: var(${COLORS.svg.text.value});
  ${H4_SEMIBOLD_STYLES};
  text-anchor: middle;
`;

export const Limit = styled.text`
  fill: var(${COLORS.svg.text.limit});
  ${TEXT_3_STYLES};
  text-anchor: middle;
`;
