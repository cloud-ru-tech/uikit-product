import { styled } from '@linaria/react';

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #ffffff;

  &[data-type='default']: {
    border: 1px solid #d2d2d2;
    border-radius: 4px;
  }

  &[data-type='security'] {
    border: 1px solid #d2d2d2;
    border-radius: 4px;
  }

  &[data-type='number'] {
    border: 1px solid #d2d2d2;
    border-radius: 4px;
  }

  &[data-type='embed'] {
    border: 0;
    border-radius: 0;
  }
`;

export const StyledInput = styled.input`
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  font-family: SB Sans Interface;
  color: #1b1b1b;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  background: transparent;
  border: 0;
  outline: 0;

  &[data-disabled='true'] {
    color: #a0a0a0;
  }

  &::placeholder {
    color: #a0a0a0;
  }

  &[data-type='default'] {
    height: $input-height;
    padding: 12px;
  }

  &[data-type='embed'] {
    height: 40px;
    padding: 10px 12px;
  }

  &[data-type='security'] {
    height: $input-height;
    padding: 12px;
  }

  &[data-type='number'] {
    height: $input-height;
    padding: 12px;
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
`;
export const StyledClearButton = styled.div`
  cursor: pointer;
  margin-right: 8px;
  fill: #d2d2d2;
  :hover {
    fill: #343f48;
  }
`;

export const CopyButton = styled.div`
  cursor: pointer;
  margin-right: 8px;
  fill: #d2d2d2;
  :hover {
    fill: #343f48;
  }
`;
