import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StepperWrapper = styled.div<{ minWidth: number }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  height: 50px;
  overflow: hidden;
  padding: 4px 0 0;
  min-width: ${({ minWidth }) => minWidth}px;
`;

export const StepperFilledRow = styled.div<{ fillRowLeftPosition: number }>`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(${COLORS.row.filled});
  left: ${({ fillRowLeftPosition }) => `-${fillRowLeftPosition}%`};
  transition: left 0.5s ease;
`;

export const StepperBackgroundRow = styled.div`
  margin-top: 4px;
  display: flex;
  position: absolute;
  height: 8px;
  left: 0;
  width: 100%;
  background: var(${COLORS.row.empty});
  border-radius: 8px;
  overflow: hidden;
`;
