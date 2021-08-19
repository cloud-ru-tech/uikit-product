import { styled } from '@linaria/react';

import { BaseButton } from '../../helperComponents';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Button = styled(BaseButton)`
  width: 28px;
  height: 28px;
  border-radius: 20px;

  fill: var(${COLORS.FILL});
  background-color: var(${COLORS.BG});

  :hover {
    fill: var(${COLORS.FILL_HOVER});
    background-color: var(${COLORS.BG_HOVER});
  }

  :active {
    fill: var(${COLORS.FILL_ACTIVE});
    background-color: var(${COLORS.BG_ACTIVE});
  }

  &[data-loading] {
    fill: var(${COLORS.FILL_LOADING});
    background-color: var(${COLORS.BG_LOADING});
  }

  :not(&[data-loading]):disabled {
    fill: var(${COLORS.FILL_DISABLED});
    background-color: var(${COLORS.BG_DISABLED});
  }
`;
