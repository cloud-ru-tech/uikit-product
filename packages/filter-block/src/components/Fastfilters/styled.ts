import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const FastFilter = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  fill: var(${COLORS.FILL});

  &[data-active] {
    background-color: var(${COLORS.BG_ACTIVE});
  }

  &:hover {
    background-color: var(${COLORS.BG_HOVER});
    fill: var(${COLORS.FILL_HOVER});
    color: var(${COLORS.FILL_HOVER});
  }
`;

export const IconWrap = styled.div`
  display: flex;
  margin-right: 12px;
`;

export const FiltersBlock = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`;
