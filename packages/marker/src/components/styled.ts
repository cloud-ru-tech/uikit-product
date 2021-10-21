import { styled } from '@linaria/react';

import { Variants } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Marker = styled.div`
  padding: 0 8px;
  border-radius: 4px;
  width: fit-content;
  cursor: default;
  line-height: 18px;

  &[data-variant='${Variants.Green}'] {
    background-color: var(${COLORS.GREEN_BG});
    color: var(${COLORS.GREEN_COLOR});
    border: 1px solid var(${COLORS.GREEN_BORDER});
  }

  &[data-variant='${Variants.Blue}'] {
    background-color: var(${COLORS.BLUE_BG});
    color: var(${COLORS.BLUE_COLOR});
    border: 1px solid var(${COLORS.BLUE_BORDER});
  }

  &[data-variant='${Variants.Red}'] {
    background-color: var(${COLORS.RED_BG});
    color: var(${COLORS.RED_COLOR});
    border: 1px solid var(${COLORS.RED_BORDER});
  }
`;
