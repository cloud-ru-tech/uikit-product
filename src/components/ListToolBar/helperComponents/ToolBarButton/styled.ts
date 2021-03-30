import { css } from '@linaria/core';

import { COLORS_TOOLBAR } from 'theme/color/vars';

const activeToolbarButtonClassName = css`
  color: var(${COLORS_TOOLBAR.ACTIVE_BUTTON}) !important;
  fill: var(${COLORS_TOOLBAR.ACTIVE_BUTTON}) !important;
`;

export { activeToolbarButtonClassName };
