import { css } from '@linaria/core';

export const refreshAnimation = css`
  transform: rotate(360deg);
  transition-duration: 0.5s;
  &:active {
    transform: rotate(0deg);
    transition-duration: 0s;
  }
`;
