import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Link = styled.a`
  color: unset;
  display: flex;
  width: 100%;
  padding: 8px 16px;
  gap: 12px;
  cursor: pointer;

  &:hover {
    background-color: var(${COLORS.background.hover});
  }
`;
