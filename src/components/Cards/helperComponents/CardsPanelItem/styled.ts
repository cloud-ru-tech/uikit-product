import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const StyledButtonGroup = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  gap: 16px;
`;

export const StyledContent = styled.div`
  margin-top: 16px;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledHeaderItem = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  text-align: left;
`;

export const StyledMoreButtonWrap = styled.div`
  margin: -12px -16px;
`;

export const favouriteButtonClassname = css`
  cursor: pointer;
  fill: #d2d2d2;

  transition: all 0.2s ease-in-out;
  &:hover {
    fill: #5558fa;
  }
  &[data-filled='true'] {
    fill: #f0d559;
  }
`;
