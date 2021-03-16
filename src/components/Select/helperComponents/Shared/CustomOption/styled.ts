import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const optionClass = css`
  outline: 0;
`;

export const StyledDescWrap = styled.div`
  margin: 0 10px;
  flex-grow: 1;
  overflow: hidden;
`;

export const StyledOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
