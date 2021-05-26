import { styled } from '@linaria/react';
import TextareaAutosize from 'react-textarea-autosize';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_INPUT } = EXPORT_VARS;

export const StyledTextareaAutosize = styled(TextareaAutosize)`
  width: 100%;
  max-width: 100%;

  padding: 12px;

  font-family: SB Sans Interface;
  color: var(${COLORS_INPUT.INPUT_TEXT_COLOR});
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid var(${COLORS_INPUT.INPUT_BORDER});
  box-sizing: border-box;
  border-radius: 4px;
  background-color: var(${COLORS_INPUT.INPUT_BG});

  outline: 0;

  &::placeholder {
    color: var(${COLORS_INPUT.INPUT_PLACEHOLDER_COLOR});
  }

  &:hover {
    border-color: var(${COLORS_INPUT.INPUT_HOVER_BORDER});
    background-color: var(${COLORS_INPUT.INPUT_HOVER_BACKGROUND});
    &::placeholder {
      color: var(${COLORS_INPUT.INPUT_HOVER_PLACEHOLDER_COLOR});
    }
  }

  &:focus {
    border-color: var(${COLORS_INPUT.INPUT_FOCUS_BORDER});
    background-color: var(${COLORS_INPUT.INPUT_FOCUS_BACKGROUND});
  }
`;
