import { css } from '@linaria/core';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TOOLBAR } = EXPORT_VARS;

const activeToolbarButtonClassName = css`
  color: var(${COLORS_TOOLBAR.ACTIVE_BUTTON}) !important;
  fill: var(${COLORS_TOOLBAR.ACTIVE_BUTTON}) !important;
`;

export { activeToolbarButtonClassName };
