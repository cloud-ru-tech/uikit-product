import { styled } from '@linaria/react';

import { Orientation, Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

interface IStyleProps {
  variant: Variant;
  orientation: Orientation;
}

const ROTATE = {
  [Orientation.Horizontal]: 'none',
  [Orientation.Vertical]: 'rotate(90deg)',
};

export const StyledDivider = styled.hr<IStyleProps>`
  width: 100%;
  margin: 0;
  border: none;
  transform: ${({ orientation }) => ROTATE[orientation]};
  border-bottom: ${({ variant }) => `1px solid var(${COLORS[variant]})`};
`;
