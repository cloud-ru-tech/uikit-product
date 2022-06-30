import { styled } from '@linaria/react';

import { SIZES_IN_PX, Sizes } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.span`
  display: inline-flex;

  fill: var(${COLORS.fill});
  background-color: var(${COLORS.background});

  border-radius: 50%;

  &[data-size=${Sizes.Medium}] {
    padding: ${SIZES_IN_PX[Sizes.Medium].padding};
  }

  &[data-size=${Sizes.Large}] {
    padding: ${SIZES_IN_PX[Sizes.Large].padding};
  }
`;
