import { styled } from '@linaria/react';

import { PaginationButton } from '../PaginationButton';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Button = styled(PaginationButton)`
  padding: 0 4px;

  &[data-selected] {
    background-color: var(${COLORS.background.selected.default});
    color: var(${COLORS.text.selected.default});

    &:hover {
      background-color: var(${COLORS.background.selected.hover});
      color: var(${COLORS.text.selected.hover});
    }
  }
`;
