import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, DARK_THEMES, LIGHT_THEMES } from './themes';

LIGHT_THEMES;
DARK_THEMES;

export const NoDataContainer = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;

  fill: var(${COLORS.icon});
`;

export const NoDataText = styled.span`
  ${TEXT_2_STYLES};
  color: var(${COLORS.text});
`;
