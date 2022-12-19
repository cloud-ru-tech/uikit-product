import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div<{ top: number; strategy: string }>`
  position: ${props => props.strategy};
  z-index: 1;
  top: ${props => props.top}px;
  left: 0;

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  box-sizing: border-box;
  width: 100%;
  height: calc(100% - ${props => props.top}px);
  padding: 12px 0;

  background-color: var(${COLORS.background.default});

  & * {
    box-sizing: border-box;
  }
`;
