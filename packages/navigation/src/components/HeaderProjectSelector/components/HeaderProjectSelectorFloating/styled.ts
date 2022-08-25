import { styled } from '@linaria/react';

import { SHADOW } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div<{ strategy: string; x: number; y: number }>`
  background-color: var(${COLORS.background.default});
  border-radius: 8px;
  box-shadow: ${SHADOW.SMALL};
  display: flex;
  flex-direction: column;
  left: ${props => props.x}px;
  max-height: 250px;
  outline: none;
  position: ${props => props.strategy};
  top: ${props => props.y}px;
`;
