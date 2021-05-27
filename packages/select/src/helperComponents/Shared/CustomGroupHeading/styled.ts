import { css } from '@linaria/core';

export const arrowClass = css`
  margin-right: 8px;

  &[data-open] {
    transform: rotate(180deg);
  }
`;
