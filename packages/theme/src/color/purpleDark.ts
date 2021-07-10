import { css } from '@linaria/core';
import { purpleDarkDeprecated } from './DEPRECATED/purple-dark';

export const purpleDark = css`
  :global() {
    [data-theme='purpleDark'] {
      ${purpleDarkDeprecated}
    }
  }
`;
