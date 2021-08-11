import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const SearchPanelView = css`
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const PaginationWrapper = styled.div`
  padding-top: 20px;
`;

export const refreshAnimation = css`
  transform: rotate(360deg);
  transition-duration: 0.5s;
  &:active {
    transform: rotate(0deg);
    transition-duration: 0s;
  }
`;
