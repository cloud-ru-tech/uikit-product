import { css } from '@linaria/core';
import { purpleDeprecated } from './DEPRECATED/purple';

/* TODO: использовать [data-theme='${Themes.Purple}'] */
export const purple = css`
  :global() {
    [data-theme='purple'] {
      ${purpleDeprecated}
    }
  }
`;
