import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const InputContainer = styled.span<{ size: number }>`
  position: relative;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  align-items: center;

  font-size: 14px;
  line-height: 20px;
  padding: 0 32px 0 12px;

  height: ${props => `${props.size}px`};

  &[data-error] {
    border: 1px solid var(${COLORS.INPUT_ERROR_BORDER});

    &:hover,
    &:focus {
      border: 1px solid var(${COLORS.INPUT_ERROR_BORDER});
    }
  }
`;

export const calendarIconClassName = css`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);

  fill: var(${COLORS.DATE_INPUT_ICON_FILL});
`;

export const Error = styled.span`
  color: var(${COLORS.INPUT_ERROR});
  font-size: 12px;
  line-height: 16px;
`;
