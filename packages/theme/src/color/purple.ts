import { css } from '@linaria/core';

import { Themes } from '../types/theme';
import { purpleDeprecated } from './DEPRECATED/purple';

export const purple = /*#__PURE__*/ css`
  :global() {
    html[data-theme='${Themes.Purple}'] {
      ${purpleDeprecated};
    }
  }
`;
