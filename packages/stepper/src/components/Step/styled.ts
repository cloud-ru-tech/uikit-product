import { styled } from '@linaria/react';

import { CheckboxCheckedSVG } from '@sbercloud/uikit-product-icons';
import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Step = styled.div<{ leftPosition: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
  left: ${({ leftPosition }) => `${leftPosition}%`};

  &[data-first-step] {
    transform: translateX(0);
    align-items: start;
  }

  &[data-last-step] {
    transform: translateX(-100%);
    align-items: end;
  }
`;

export const StepCircle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-self: center;
  border-radius: 100%;
  background-color: var(${COLORS.step.background.inactive});
  margin-bottom: 12px;
  transition: background-color ${ANIMATIONS.TRANSITION};
  height: 16px;
  min-height: 16px;
  width: 16px;
  min-width: 16px;

  &[data-is-clickable] {
    &:hover {
      cursor: pointer;
    }
  }

  &[data-current],
  &[data-filled] {
    background-color: var(${COLORS.step.background.active});
  }

  &[data-error] {
    background-color: var(${COLORS.step.background.error});
  }
`;

export const StepLabel = styled.div`
  ${TEXT_2_STYLES};
  color: var(${COLORS.step.label.inactive});
  white-space: nowrap;
  text-align: center;
  transition: color ${ANIMATIONS.TRANSITION};

  &[data-is-clickable] {
    &:hover {
      cursor: pointer;
    }
  }

  &[data-filled] {
    color: var(${COLORS.step.label.active});
  }

  &[data-current] {
    ${H5_STYLES};
    color: var(${COLORS.step.label.active});
  }

  &[data-error] {
    color: var(${COLORS.step.background.error});
  }
`;

export const Dot = styled.div`
  height: 4px;
  width: 4px;
  border-radius: 4px;
  background-color: var(${COLORS.step.indicator});
`;

export const CheckboxChecked = styled(CheckboxCheckedSVG)`
  fill: var(${COLORS.step.indicator});
`;
