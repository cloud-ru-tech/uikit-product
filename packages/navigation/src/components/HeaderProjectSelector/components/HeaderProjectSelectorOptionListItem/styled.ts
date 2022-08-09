import { styled } from '@linaria/react';

import { HeaderProjectSelectorBoxListItem } from '../HeaderProjectSelectorBoxListItem';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled(HeaderProjectSelectorBoxListItem)`
  cursor: pointer;
  outline: none;

  &[data-active],
  &:hover {
    background-color: var(${COLORS.background.hover});
  }

  &[data-selected] {
    background-color: var(${COLORS.background.selected});
  }
`;
