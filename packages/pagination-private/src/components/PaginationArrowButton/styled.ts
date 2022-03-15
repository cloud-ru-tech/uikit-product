import { styled } from '@linaria/react';

import { PaginationButton } from '../PaginationButton';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Button = styled(PaginationButton)`
  fill: currentColor;

  &[data-disabled] {
    cursor: none;
    fill: var(${COLORS.fill.disabled});
    pointer-events: none;
  }
`;
