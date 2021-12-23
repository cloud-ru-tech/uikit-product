import { styled } from '@linaria/react';
import TextareaAutosize from 'react-textarea-autosize';

import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  box-sizing: border-box;
  padding: 0 12px 6px 12px;
  border: 1px solid var(${COLORS.border.default});
  border-radius: 4px;
  background-color: var(${COLORS.background.default});

  &:hover {
    border-color: var(${COLORS.border.hover});
  }

  &:focus,
  &:active,
  &[data-focused] {
    border-color: var(${COLORS.border.active});
  }

  &[data-error] {
    border-color: var(${COLORS.border.error});
  }

  &[data-disabled] {
    border-color: var(${COLORS.border.disabled});
    background-color: var(${COLORS.background.disabled});
  }
`;

export const TextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  max-width: 100%;
  border-width: 0;

  font-family: SB Sans Interface, serif;
  color: var(${COLORS.text.default});
  ${TYPOGRAPHY_VARIABLES.TEXT_2};

  box-sizing: border-box;

  background-color: transparent;

  padding-top: 12px;
  padding-right: 12px;

  outline: 0;

  &[disabled] {
    background-color: transparent;
    color: var(${COLORS.text.disabled});
  }

  &::placeholder {
    color: var(${COLORS.placeholder.default});
  }

  &[disabled]::placeholder {
    color: var(${COLORS.placeholder.disabled});
  }

  &::-webkit-scrollbar {
    width: 0;
    max-width: 0;
  }
`;

export const ClearButton = styled(ButtonIcon)`
  align-self: flex-start;
  margin-top: 12px;
`;
