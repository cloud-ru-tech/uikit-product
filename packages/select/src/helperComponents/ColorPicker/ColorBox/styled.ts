import { styled } from '@linaria/react';

import { Colors } from '../../../constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Box = styled.div`
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;

  &[data-color='${Colors.Green}'] {
    background-color: var(${COLORS.background.green});
  }

  &[data-color='${Colors.Blue}'] {
    background-color: var(${COLORS.background.blue});
  }

  &[data-color='${Colors.Purple}'] {
    background-color: var(${COLORS.background.purple});
  }

  &[data-color='${Colors.Pink}'] {
    background-color: var(${COLORS.background.pink});
  }

  &[data-color='${Colors.Red}'] {
    background-color: var(${COLORS.background.red});
  }

  &[data-color='${Colors.Brown}'] {
    background-color: var(${COLORS.background.brown});
  }

  &[data-color='${Colors.Orange}'] {
    background-color: var(${COLORS.background.orange});
  }

  &[data-color='${Colors.Yellow}'] {
    background-color: var(${COLORS.background.yellow});
  }
`;
