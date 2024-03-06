import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  grid-column: span 12;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  max-height: 132px;
`;

export const cardClassName = css`
  flex-grow: 0;
`;
