import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Pie = styled.div<{ percent: number }>`
  border-radius: 50%;
  height: 20px;
  position: relative;
  width: 20px;

  &::before,
  &::after {
    border-radius: inherit;
    content: '';
    height: inherit;
    left: 0;
    position: absolute;
    top: 0;
    width: inherit;
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
