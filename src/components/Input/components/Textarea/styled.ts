import TextareaAutosize from 'react-textarea-autosize';
import { styled } from '@linaria/react';

import { COLORS_INPUT } from 'theme/color/vars';

export const StyledTextareaAutosize = styled(TextareaAutosize)`
  width: 100%;
  max-width: 100%;

  padding: 12px;

  color: var(${COLORS_INPUT.INPUT_TEXT_COLOR});
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
