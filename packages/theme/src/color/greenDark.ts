import { css } from '@linaria/core';

import { Themes } from '../types/theme';
import { greenDarkDeprecated } from './DEPRECATED/green-dark';

export const greenDark = /*#__PURE__*/ css`
  :global() {
    html[data-theme='${Themes.GreenDark}'] {
      ${greenDarkDeprecated};
    }
  }
`;
