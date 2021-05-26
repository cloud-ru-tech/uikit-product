import { css } from '@linaria/core';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_INPUT } = EXPORT_VARS;

export const inputClassname = css`
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  font-family: SB Sans Interface;
  color: var(${COLORS_INPUT.INPUT_TEXT_COLOR});
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  outline: 0;
  background-color: var(${COLORS_INPUT.INPUT_BG});
  border: 1px solid var(${COLORS_INPUT.INPUT_BORDER});
  border-radius: 4px;
  padding: 11px;

  &::placeholder {
    color: var(${COLORS_INPUT.INPUT_PLACEHOLDER_COLOR});
  }

  &[data-type='number'] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    -moz-appearance: textfield;
    &:hover,
    &:focus {
      -moz-appearance: number-input;
    }
  }

  &[data-disabled='true'] {
    color: var(${COLORS_INPUT.INPUT_DISABLED_COLOR});
  }

  &[data-type='embed'] {
    height: 40px;
    padding: 10px 12px;
  }

  &:hover {
    background-color: var(${COLORS_INPUT.INPUT_HOVER_BACKGROUND});
    border: 1px solid var(${COLORS_INPUT.INPUT_HOVER_BORDER});
    &::placeholder {
      color: var(${COLORS_INPUT.INPUT_HOVER_PLACEHOLDER_COLOR});
    }
  }

  &:focus {
    background-color: var(${COLORS_INPUT.INPUT_FOCUS_BACKGROUND});
    border: 1px solid var(${COLORS_INPUT.INPUT_FOCUS_BORDER});
  }

  &[data-disabled='true'] {
    background-color: var(${COLORS_INPUT.INPUT_DISABLED_BACKGROUND});
    border: 1px solid var(${COLORS_INPUT.INPUT_DISABLED_BORDER});
    color: var(${COLORS_INPUT.INPUT_DISABLED_COLOR})
    &::placeholder {
      color: var(${COLORS_INPUT.INPUT_DISABLED_COLOR});
    }
    &:hover {
      &::placeholder {
        color: var(${COLORS_INPUT.INPUT_DISABLED_COLOR});
      }
    }
  }

  &[data-type='embed'] {
    border: 0 !important;
    border-radius: 0;
  }
`;
