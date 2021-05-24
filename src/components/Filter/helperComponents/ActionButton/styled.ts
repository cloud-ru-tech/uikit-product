import { styled } from '@linaria/react';

import { TEXT_2 } from 'typography/vars';
import { COLORS_FILTER } from 'theme/color/vars';

export const Button = styled.button`
  position: relative;
  border: 0;
  outline: 0;
  cursor: pointer;
  display: inline-flex;

  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  margin-right: 8px;
  gap: 8px;

  color: var(${COLORS_FILTER.FILTER_ACTION_BUTTON_COLOR});
  fill: var(${COLORS_FILTER.FILTER_ACTION_BUTTON_FILLED});

  background: transparent;

  ${TEXT_2}

  &:hover,
  &:focus {
    color: var(${COLORS_FILTER.FILTER_ACTION_BUTTON_HOVER_COLOR});
    fill: var(${COLORS_FILTER.FILTER_ACTION_BUTTON_HOVER_FILLED});
  }

  &:disabled {
    color: var(${COLORS_FILTER.FILTER_ACTION_BUTTON_DISABLED_COLOR});
    fill: var(${COLORS_FILTER.FILTER_ACTION_BUTTON_DISABLED_FILLED});
    cursor: not-allowed;
  }
`;
