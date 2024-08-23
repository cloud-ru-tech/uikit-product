import { css } from '@linaria/core';

import { Themes } from '../types/theme';
import { purpleDarkDeprecated } from './DEPRECATED/purple-dark';

export const purpleDark = /*#__PURE__*/ css`
  :global() {
    html[data-theme='${Themes.PurpleDark}'] {
      ${purpleDarkDeprecated};
    }
  }
`;
