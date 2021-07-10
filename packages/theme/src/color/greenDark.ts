import { css } from '@linaria/core';
import { greenDarkDeprecated } from './DEPRECATED/green-dark';

export const greenDark = css`
  :global() {
    [data-theme='greenDark'] {
      ${greenDarkDeprecated}
    }
  }
`;
