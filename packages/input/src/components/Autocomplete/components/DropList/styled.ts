import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const ListItemWrapper = styled.div`
  &[data-disabled] {
    cursor: not-allowed;
  }
`;

export const AdditionalItem = styled.div`
  ${TEXT_2_STYLES};
  padding: 8px 12px;

  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: start;
  box-sizing: content-box;
  gap: 8px;

  color: var(${COLORS.additionalItem.text});
  fill: var(${COLORS.additionalItem.text});

  :hover {
    background-color: var(${COLORS.additionalItem.hover.background});
  }

  &[data-disabled] {
    pointer-events: none;

    background-color: unset;
    color: var(${COLORS.additionalItem.disabled});
    fill: var(${COLORS.additionalItem.disabled});
  }
`;

export const DividerWrapper = styled.div`
  padding: 4px 12px 0px;
`;
