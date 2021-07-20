import { css } from '@linaria/core';
import { purpleDarkDeprecated } from './DEPRECATED/purple-dark';

/* TODO: использовать [data-theme='${Themes.PurpleDark}'] */
export const purpleDark = css`
  :global() {
    [data-theme='purpleDark'] {
      ${purpleDarkDeprecated}
    }
  }
`;
