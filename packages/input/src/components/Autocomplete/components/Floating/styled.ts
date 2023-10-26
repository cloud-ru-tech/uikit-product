import { styled } from '@linaria/react';

import { SHADOW } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div<{ strategy: string; x: number; y: number; maxHeight: number }>`
  position: ${props => props.strategy};
  max-height: ${props => props.maxHeight}px;
  top: ${props => props.y}px;
  left: ${props => props.x}px;

  display: flex;
  flex-direction: column;

  background-color: var(${COLORS.background.default});
  border-radius: 8px;
  outline: none;
  box-shadow: ${SHADOW.SMALL};

  // Выпилится в таске: https://jira.sbercloud.tech/browse/FF-3637
  z-index: 1;
`;
