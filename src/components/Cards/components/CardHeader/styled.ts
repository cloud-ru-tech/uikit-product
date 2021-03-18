import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const StyledFavouriteWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const favouriteButtonClassName = css`
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

export const moreButtonClassName = css`
  & > span {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  margin: -12px -16px;
`;
