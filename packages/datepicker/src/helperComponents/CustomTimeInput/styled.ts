import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_DATEPICKER } = DEPRECATED_EXPORT_VARS;

export const Container = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 32px 12px 12px;
  outline: 0;
  background: transparent;
  cursor: pointer;

  background-color: var(${COLORS_DATEPICKER.INPUT_BACKGROUND_COLOR});
  border: 1px solid var(${COLORS_DATEPICKER.INPUT_BORDER_COLOR});

  box-sizing: border-box;
  border-radius: 4px;

  box-sizing: border-box;
  height: 44px;

  &:not([data-disabled]):hover {
    background-color: var(${COLORS_DATEPICKER.INPUT_HOVER_BACKGROUND});
    border: 1px solid var(${COLORS_DATEPICKER.INPUT_HOVER_BORDER});
    &::placeholder {
      color: var(${COLORS_DATEPICKER.INPUT_HOVER_PLACEHOLDER_COLOR});
    }
  }

  &:not([data-disabled])&:focus {
    background-color: var(${COLORS_DATEPICKER.INPUT_FOCUS_BACKGROUND});
    border: 1px solid var(${COLORS_DATEPICKER.INPUT_FOCUS_BORDER});
  }

  &[data-open] {
    background-color: var(${COLORS_DATEPICKER.INPUT_FOCUS_BACKGROUND});
    border: 1px solid var(${COLORS_DATEPICKER.INPUT_FOCUS_BORDER});
  }

  &[data-disabled] {
    color: var(${COLORS_DATEPICKER.TIME_INPUT_DISABLED_COLOR});
    background-color: var(${COLORS_DATEPICKER.TIME_INPUT_DISABLED_BACKGROUND_COLOR});
  }
`;

export const iconClassName = css`
  position: absolute;
  top: 12px;
  right: 8px;
  fill: var(${COLORS_DATEPICKER.TIME_INPUT_ICON_FILL});

  &[data-open] {
    transform: rotate(180deg);
  }

  &[data-disabled] {
    fill: var(${COLORS_DATEPICKER.TIME_INPUT_DISABLED_ICON_FILL});
  }
`;
