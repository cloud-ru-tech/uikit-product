import { styled } from '@linaria/react';

import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_THEME;
GREEN_DARK_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const MenuItem = styled.a`
  ${TEXT_2_STYLES};

  cursor: pointer;

  display: flex;
  justify-content: space-between;

  padding: 8px 16px;

  color: var(${COLORS.text.default});

  &[data-active] {
    color: var(${COLORS.text.selected});
  }

  &[data-disabled] {
    cursor: default;
    color: var(${COLORS.text.disabled});
  }

  &:hover:not([data-disabled]) {
    background-color: var(${COLORS.background.hover});
  }
`;

export const Offsets = styled.div`
  display: flex;
  align-items: center;
`;

export const Offset = styled.div`
  width: 8px;
  height: 20px;
  margin-right: 8px;
`;

export const MenuItemLabel = styled(TruncateString)`
  flex-grow: 1;
`;
