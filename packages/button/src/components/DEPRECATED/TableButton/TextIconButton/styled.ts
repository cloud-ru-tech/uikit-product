import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

const { TABLE_BUTTON_COLORS } = DEPRECATED_EXPORT_VARS;
const { TABLE_TEXT } = TYPOGRAPHY_VARIABLES;

export const TableTextButtonComponent = styled.button`
  position: relative;
  border-radius: 50px;
  padding: 4px 4px 4px 12px;

  border: 0;
  outline: 0;
  cursor: pointer;
  display: inline-flex;

  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  ${TABLE_TEXT};

  color: var(${TABLE_BUTTON_COLORS.TEXT_ICON_CONTENT});
  fill: var(${TABLE_BUTTON_COLORS.TEXT_ICON_CONTENT});
  background-color: var(${TABLE_BUTTON_COLORS.TEXT_ICON_BACKGROUND});
  &:hover {
    background-color: var(${TABLE_BUTTON_COLORS.TEXT_ICON_BACKGROUND_HOVER});
  }
  &:active {
    background-color: var(${TABLE_BUTTON_COLORS.TEXT_ICON_BACKGROUND_ACTIVE});
  }
  &:focus-visible {
    background-color: var(${TABLE_BUTTON_COLORS.TEXT_ICON_BACKGROUND_FOCUS});
  }

  &:disabled {
    color: var(${TABLE_BUTTON_COLORS.TEXT_ICON_CONTENT_DISABLED});
    fill: var(${TABLE_BUTTON_COLORS.TEXT_ICON_CONTENT_DISABLED});
    background-color: var(${TABLE_BUTTON_COLORS.TEXT_ICON_BACKGROUND_DISABLED});
    cursor: not-allowed;
  }

  &[data-inprogress='true'] {
    color: var(${TABLE_BUTTON_COLORS.TEXT_ICON_CONTENT});
    fill: var(${TABLE_BUTTON_COLORS.TEXT_ICON_CONTENT});
    background-color: var(${TABLE_BUTTON_COLORS.TEXT_ICON_BACKGROUND_IN_PROGRESS});
    cursor: pointer;
  }
`;

export const IconWrap = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
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
