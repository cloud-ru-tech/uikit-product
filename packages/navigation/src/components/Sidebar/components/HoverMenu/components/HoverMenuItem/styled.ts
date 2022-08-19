import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_THEME;
GREEN_DARK_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const MenuItem = styled.a`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  color: var(${COLORS.text.default});
  cursor: pointer;

  &[data-selected] {
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

export const MenuItemLabel = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
