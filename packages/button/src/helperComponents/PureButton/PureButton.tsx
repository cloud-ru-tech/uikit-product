import { styled } from '@linaria/react';

export const PureButton = styled.button`
  display: inline-block;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;

  :disabled {
    cursor: not-allowed;
  }
`;
