import { styled } from '@linaria/react';
import { VFC } from 'react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { PaginationButtonProps } from './types';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const styledPaginationButton = (
  PaginationButton: VFC<PaginationButtonProps>,
): VFC<PaginationButtonProps> => styled(PaginationButton)`
  align-items: center;
  border-radius: 4px;
  box-sizing: border-box;
  color: var(${COLORS.text.default});
  cursor: pointer;
  display: flex;
  height: 32px;
  justify-content: center;
  min-width: 32px;
  transition-duration: 200ms;
  transition-property: background-color, color, fill;
  transition-timing-function: ease-out;
  user-select: none;

  &:hover {
    background-color: var(${COLORS.background.hover});
    color: var(${COLORS.text.hover});
  }
`;
