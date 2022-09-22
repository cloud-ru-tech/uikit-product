import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div<{ left: number; top: number; strategy: string }>`
  position: ${props => props.strategy};
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  height: calc(100% - ${props => props.top}px);
  width: 100%;
  background-color: var(${COLORS.background.default});
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 0;
  row-gap: 12px;
  overflow-y: auto;
  z-index: 1;

  & * {
    box-sizing: border-box;
  }
`;
