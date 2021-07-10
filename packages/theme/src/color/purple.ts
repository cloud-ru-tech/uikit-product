import { css } from '@linaria/core';
import { purpleDeprecated } from './DEPRECATED/purple';

export const purple = css`
  :global() {
    [data-theme='purple'] {
      ${purpleDeprecated}
    }
  }
`;
