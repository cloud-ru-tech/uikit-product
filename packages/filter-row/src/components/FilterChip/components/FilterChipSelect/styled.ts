import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, DARK_THEMES, LIGHT_THEMES } from './themes';

LIGHT_THEMES;
DARK_THEMES;

export const SelectItemContainer = styled.div``;
export const ActionItemContainer = styled.div``;

export const SelectItemHeader = styled.div`
  ${TEXT_3_STYLES};

  color: var(${COLORS.groupHeader});
  padding: 16px 12px 4px;
`;

export const checkboxClassname = css`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
