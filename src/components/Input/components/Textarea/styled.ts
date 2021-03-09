import TextareaAutosize from 'react-textarea-autosize';
import { styled } from '@linaria/react';

export const StyledTextareaAutosize = styled(TextareaAutosize)`
  width: 100%;
  max-width: 100%;

  padding: 12px;

  border: 1px solid #d2d2d2;
  box-sizing: border-box;
  border-radius: 4px;

  outline: 0;
`;
