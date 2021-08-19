import { styled } from '@linaria/react';

export const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
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

    svg {
      pointer-events: none;
    }
  }

  /* чтобы к иконкам применялся align-items */
  svg {
    display: block;
  }
`;
