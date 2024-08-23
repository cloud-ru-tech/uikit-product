import { css } from '@linaria/core';

import { Themes } from '../types/theme';
import { greenDeprecated } from './DEPRECATED/green';

export const green = /*#__PURE__*/ css`
  :global() {
    html[data-theme='${Themes.Green}'] {
      ${greenDeprecated};
    }
  }
`;
