import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Dot = styled.span`
  background-color: var(${COLORS.background.unselected.default});
  border-radius: 50%;
  display: block;
  height: inherit;
`;

export const Link = styled.a`
  cursor: pointer;
  display: block;
  height: 8px;
  padding: 2px;
  width: 8px;

  &:hover,
  &[data-selected] {
    ${Dot} {
      transform: scale(1.25);
    }
  }

  &:hover ${Dot} {
    background-color: var(${COLORS.background.unselected.hover});
  }

  &[data-selected] ${Dot} {
    background-color: var(${COLORS.background.selected.default});
  }
`;
