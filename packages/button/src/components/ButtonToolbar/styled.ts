import { styled } from '@linaria/react';

import { BaseButton } from '../../helperComponents';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Button = styled(BaseButton)`
  width: 44px;
  height: 40px;

  fill: var(${COLORS.FILL});
  background-color: var(${COLORS.BG});

  :hover {
    fill: var(${COLORS.FILL_HOVER});
  }

  :active {
    fill: var(${COLORS.FILL_ACTIVE});
  }

  :disabled {
    fill: var(${COLORS.FILL_DISABLED});
  }
`;
