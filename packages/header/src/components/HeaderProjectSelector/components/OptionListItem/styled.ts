import { styled } from '@linaria/react';

import { BoxListItem } from '../BoxListItem';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Actions = styled.div``;

export const Wrapper = styled(BoxListItem)`
  cursor: pointer;
  outline: none;

  &:not(:hover) ${Actions} {
    display: none;
  }

  &[data-selected] {
    background-color: var(${COLORS.background.selected});
  }

  &[data-active],
  &:hover {
    background-color: var(${COLORS.background.hover});
  }
`;
