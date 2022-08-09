import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const HeaderProjectSelectorIcon = styled.span`
  display: contents;
  fill: var(${COLORS.fill.default});

  > svg {
    flex-shrink: 0;
  }
`;
