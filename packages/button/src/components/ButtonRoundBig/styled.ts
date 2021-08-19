import { styled } from '@linaria/react';

import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { BaseButton } from '../../helperComponents';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Button = styled(BaseButton)`
  height: 36px;
  padding: 8px 16px 8px 8px;
  border-radius: 18px;

  ${TYPOGRAPHY_VARIABLES.TEXT_2}

  fill: var(${COLORS.FILL});
  background-color: var(${COLORS.BG});
  color: var(${COLORS.COLOR});

  :hover {
    fill: var(${COLORS.FILL_HOVER});
    background-color: var(${COLORS.BG_HOVER});
    color: var(${COLORS.COLOR_HOVER});
  }

  :active {
    fill: var(${COLORS.FILL_ACTIVE});
    background-color: var(${COLORS.BG_ACTIVE});
    color: var(${COLORS.COLOR_ACTIVE});
  }

  :disabled {
    fill: var(${COLORS.FILL_DISABLED});
    background-color: var(${COLORS.BG_DISABLED});
    color: var(${COLORS.COLOR_DISABLED});
  }
`;

export const IconWrapper = styled.div`
  margin-right: 8px;
`;
