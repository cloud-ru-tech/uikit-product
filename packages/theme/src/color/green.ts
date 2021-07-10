import { css } from '@linaria/core';
import { greenDeprecated } from './DEPRECATED/green';

export const green = css`
  :global() {
    [data-theme='green'] {
      ${greenDeprecated}
    }
  }
`;
