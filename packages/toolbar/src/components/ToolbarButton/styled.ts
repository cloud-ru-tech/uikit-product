import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TOOLBAR } = DEPRECATED_EXPORT_VARS;

const activeToolbarButtonClassName = css`
  color: var(${COLORS_TOOLBAR.ACTIVE_BUTTON}) !important;
  fill: var(${COLORS_TOOLBAR.ACTIVE_BUTTON}) !important;
`;

export { activeToolbarButtonClassName };
