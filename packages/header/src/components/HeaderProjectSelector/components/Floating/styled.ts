import { FloatingOverlay } from '@floating-ui/react-dom-interactions';
import { styled } from '@linaria/react';

import { SHADOW } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div<{ strategy: string; x: number; y: number }>`
  position: ${props => props.strategy};
  top: ${props => props.y}px;
  left: ${props => props.x}px;

  display: flex;
  flex-direction: column;

  background-color: var(${COLORS.background.default});
  border-radius: 8px;
  outline: none;
  box-shadow: ${SHADOW.SMALL};
`;

export const Overlay = styled(FloatingOverlay)`
  z-index: 1;
`;
