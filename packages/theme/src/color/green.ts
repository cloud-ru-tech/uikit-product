import { css } from '@linaria/core';
import { greenDeprecated } from './DEPRECATED/green';

/* TODO: использовать [data-theme='${Themes.Green}'] */
export const green = css`
  :global() {
    [data-theme='green'] {
      ${greenDeprecated}
    }
  }
`;
