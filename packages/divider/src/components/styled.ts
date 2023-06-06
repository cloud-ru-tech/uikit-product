import { styled } from '@linaria/react';

import { Orientation, Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

type IStyleProps = {
  variant: Variant;
  orientation: Orientation;
};

export const StyledDivider = styled.hr<IStyleProps>`
  margin: 0;
  flex-shrink: 0;
  border-width: 0;
  border-style: solid;
  border-color: ${({ variant }) => `var(${COLORS[variant]})`};
  border-right-width: ${({ orientation }) => (orientation === Orientation.Vertical ? 'thin' : 0)};
  border-bottom-width: ${({ orientation }) => (orientation === Orientation.Horizontal ? 'thin' : 0)};
  width: ${({ orientation }) => (orientation === Orientation.Horizontal ? '100%' : 'auto')};
  height: ${({ orientation }) => (orientation === Orientation.Vertical ? '100%' : 'auto')};
`;
