import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_DATEPICKER } = DEPRECATED_EXPORT_VARS;

export const InputContainer = styled.span<{ size: number }>`
  position: relative;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  align-items: center;

  width: 100%;

  font-size: 14px;
  line-height: 20px;
  padding: 0 32px 0 12px;

  background-color: var(${COLORS_DATEPICKER.INPUT_BACKGROUND_COLOR});
  border: 1px solid var(${COLORS_DATEPICKER.INPUT_BORDER_COLOR});

  box-sizing: border-box;
  border-radius: 4px;

  height: ${props => `${props.size}px`};

  &:not([data-disabled='true']):hover {
    background-color: var(${COLORS_DATEPICKER.INPUT_HOVER_BACKGROUND});
    border: 1px solid var(${COLORS_DATEPICKER.INPUT_HOVER_BORDER});
    &::placeholder {
      color: var(${COLORS_DATEPICKER.INPUT_HOVER_PLACEHOLDER_COLOR});
    }
  }

  &:focus {
    background-color: var(${COLORS_DATEPICKER.INPUT_FOCUS_BACKGROUND});
    border: 1px solid var(${COLORS_DATEPICKER.INPUT_FOCUS_BORDER});
  }

  &[data-open] {
    background-color: var(${COLORS_DATEPICKER.INPUT_FOCUS_BACKGROUND});
    border: 1px solid var(${COLORS_DATEPICKER.INPUT_FOCUS_BORDER});
  }

  &[data-error] {
    border: 1px solid var(${COLORS_DATEPICKER.INPUT_ERROR_BORDER});

    &:hover,
    &:focus {
      border: 1px solid var(${COLORS_DATEPICKER.INPUT_ERROR_BORDER});
    }
  }
`;

export const Separator = styled.div`
  height: 21px;
  padding-right: 1px;
`;

export const calendarIconClassName = css`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);

  fill: var(${COLORS_DATEPICKER.DATE_INPUT_ICON_FILL});
`;

export const Error = styled.span`
  color: var(${COLORS_DATEPICKER.INPUT_ERROR});
  font-size: 12px;
  line-height: 16px;
`;
