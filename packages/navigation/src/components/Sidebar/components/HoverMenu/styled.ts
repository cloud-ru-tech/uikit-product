import { styled } from '@linaria/react';

import { SHADOW } from '@sbercloud/uikit-product-utils';

import { COLORS, DARK_THEMES, LIGHT_THEMES } from './themes';

LIGHT_THEMES;
DARK_THEMES;

type PositionProps = {
  strategy: string;
  x: number;
  y: number;
};

export const TriggerWrapper = styled.span`
  display: inline-flex;
`;

export const MenuContent = styled.div`
  box-shadow: ${SHADOW.MEDIUM};
  background: var(${COLORS.background});
  padding: 8px 0;
  border-radius: 8px;
  width: 376px;
`;

export const ContentWrapper = styled.div<PositionProps>`
  position: ${props => props.strategy};
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  z-index: 1;
`;

export const Arrow = styled.div<PositionProps>`
  position: ${props => props.strategy};
  top: ${props => props.y}px;
  left: ${props => props.x - 4}px;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-right: 4px solid var(${COLORS.background});
`;
