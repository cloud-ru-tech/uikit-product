import { css } from '@linaria/core';
import { greenDarkDeprecated } from './DEPRECATED/green-dark';

/* TODO: использовать [data-theme='${Themes.GreenDark}'] */
export const greenDark = css`
  :global() {
    [data-theme='greenDark'] {
      ${greenDarkDeprecated}
    }
  }
`;
