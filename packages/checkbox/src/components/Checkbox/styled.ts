import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const HiddenCheckbox = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  border-style: none;
  z-index: -1;
  opacity: 0;
  margin: 0;
`;

export const iconClassName = css`
  margin: -3px;
`;

export const CheckboxIconWrap = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  margin: 2px;
  height: 16px;
  width: 16px;
  border: 3px solid var(${COLORS.UNCHECKED.BORDER});
  border-radius: 4px;
  background: transparent;

  &:hover {
    border: 3px solid var(${COLORS.UNCHECKED.HOVER_BORDER});
    background-color: transparent;
  }

  &[data-checked] {
    fill: var(${COLORS.CHECKED.ICON_FILL});
    border-color: transparent;
    background-color: var(${COLORS.CHECKED.BACKGROUND});

    &:hover {
      background-color: var(${COLORS.CHECKED.HOVER_BACKGROUND});
    }
  }

  &[data-disabled] {
    border-color: var(${COLORS.UNCHECKED.DISABLED_BORDER});
    background-color: var(${COLORS.UNCHECKED.DISABLED_BACKGROUND});
    cursor: not-allowed;

    &:hover {
      background-color: var(${COLORS.UNCHECKED.DISABLED_BACKGROUND});
    }
  }

  &[data-checked][data-disabled] {
    border-color: transparent;
    background-color: var(${COLORS.CHECKED.DISABLED_BACKGROUND});

    &:hover {
      background-color: var(${COLORS.CHECKED.DISABLED_BACKGROUND});
    }
  }
`;

export const CheckboxText = styled.span`
  ${TEXT_2_STYLES};
  margin-left: 8px;

  &[data-disabled] {
    color: var(${COLORS.DISABLED_TEXT});
  }
`;

export const CheckboxWrap = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: fit-content;
`;

export const CheckboxTextWrap = styled.span`
  &:hover {
    cursor: pointer;

    &[data-disabled] {
      cursor: not-allowed;
    }
  }
`;
