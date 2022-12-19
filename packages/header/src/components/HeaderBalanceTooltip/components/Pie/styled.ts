import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Pie = styled.div<{ percent: number }>`
  position: relative;

  width: 20px;
  height: 20px;

  border-radius: 50%;

  &::before,
  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: inherit;
    height: inherit;

    border-radius: inherit;
  }

  &::before {
    background: var(${EXPORT_VARS.GRADIENT[2]});

    mask-image: conic-gradient(#000 ${props => props.percent}%, transparent ${props => props.percent}%);
  }

  &::after {
    background-color: var(${COLORS.background.default});
  }

  &[data-low]::before {
    background: var(${COLORS.foreground.low});
  }
`;
