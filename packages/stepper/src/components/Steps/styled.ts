import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-typography';

import { Sizes } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StepperWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding: 0px;
  height: 44px;
  overflow: hidden;

  &[data-size='${Sizes.Big}'] {
    padding-top: 4px;
  }
`;

export const StepperFilledRow = styled.div<{ fillRowLeftPosition: string }>`
  display: flex;
  position: absolute;
  width: 100%;
  height: 8px;
  background: var(${COLORS.BACKGROUND_ROW_FILLED});
  left: ${({ fillRowLeftPosition }) => fillRowLeftPosition};
  transition: left 0.5s ease;
  z-index: 1;
`;

export const StepperBackgroundRow = styled.div`
  display: flex;
  position: absolute;
  height: 8px;
  left: 0px;
  width: 100%;
  background: var(${COLORS.BACKGROUND_ROW_EMPTY});
  z-index: 0;
`;

export const Step = styled.div<{ leftPosition: string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  transform: translateX(-50%);
  left: ${({ leftPosition }) => leftPosition};

  &:hover {
    cursor: pointer;
  }

  &[data-size='${Sizes.Big}'] {
    margin-top: -4px;
  }

  &[data-first-step] {
    transform: translateX(0%);
    align-items: flex-start;
  }

  &[data-last-step] {
    transform: translateX(-101%);
    align-items: flex-end;
  }
`;

export const StepCircle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: var(${COLORS.STEP_INACTIVE});
  margin-bottom: 12px;
  fill: var(${COLORS.STEP_CONTENT});
  transition: background-color 0.5s ease;

  &[data-size='${Sizes.Small}'] {
    height: 8px;
    min-height: 8px;
    width: 8px;
    min-width: 8px;
  }

  &[data-size='${Sizes.Big}'] {
    height: 16px;
    min-height: 16px;
    width: 16px;
    min-width: 16px;
  }

  &[data-current],
  &[data-filled] {
    background-color: var(${COLORS.STEP_ACTIVE});
  }

  &[data-error] {
    background-color: var(${COLORS.STEP_ERROR});
  }
`;

export const StepName = styled.span`
  ${TEXT_2_STYLES};
  line-height: 22px;
  color: var(${COLORS.INACTIVE_TEXT});

  &[data-filled] {
    color: var(${COLORS.STEP_ACTIVE});
  }

  &[data-current] {
    font-weight: bold;
    color: var(${COLORS.STEP_ACTIVE});
  }

  &[data-error] {
    font-weight: normal;
    color: var(${COLORS.STEP_ERROR});
  }
`;

export const Dot = styled.div`
  height: 4px;
  width: 4px;
  border-radius: 4px;
  background-color: var(${COLORS.STEP_CONTENT});
`;
