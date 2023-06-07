import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_THEME;
GREEN_DARK_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Chip = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  background-color: var(${COLORS.background.default});
  color: var(${COLORS.text.default});
  fill: var(${COLORS.icon.default});
  user-select: none;

  &:hover {
    background-color: var(${COLORS.background.hover});
    color: var(${COLORS.text.hover});
    fill: var(${COLORS.icon.hover});
  }
`;

export const FilterLabel = styled.span`
  ${H5_STYLES};
`;

export const InnerLabel = styled.span`
  ${TEXT_2_STYLES};
`;
