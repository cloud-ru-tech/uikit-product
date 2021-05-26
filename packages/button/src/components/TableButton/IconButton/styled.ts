import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

const { TABLE_BUTTON_COLORS } = EXPORT_VARS;
const { TABLE_TEXT } = TYPOGRAPHY_VARIABLES;

export const IconButtonWrapper = styled.button`
  position: relative;
  border-radius: 50px;
  padding: 4px;

  border: 0;
  outline: 0;
  cursor: pointer;
  display: inline-flex;

  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  ${TABLE_TEXT};

  fill: var(${TABLE_BUTTON_COLORS.ICON_CONTENT});
  background-color: var(${TABLE_BUTTON_COLORS.ICON_BACKGROUND});
  &:hover {
    background-color: var(${TABLE_BUTTON_COLORS.ICON_BACKGROUND_HOVER});
  }
  &:active {
    background-color: var(${TABLE_BUTTON_COLORS.ICON_BACKGROUND_ACTIVE});
  }
  &:focus-visible {
    background-color: var(${TABLE_BUTTON_COLORS.ICON_BACKGROUND_FOCUS});
  }

  &:disabled {
    fill: var(${TABLE_BUTTON_COLORS.ICON_CONTENT_DISABLED});
    background-color: var(${TABLE_BUTTON_COLORS.ICON_BACKGROUND_DISABLED});
    cursor: not-allowed;
  }

  &[data-inprogress='true'] {
    fill: var(${TABLE_BUTTON_COLORS.ICON_CONTENT});
    background-color: var(${TABLE_BUTTON_COLORS.ICON_BACKGROUND_IN_PROGRESS});
    cursor: pointer;
  }
`;

export const RotateAnimation = css`
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: rotating 2s linear infinite;
`;
