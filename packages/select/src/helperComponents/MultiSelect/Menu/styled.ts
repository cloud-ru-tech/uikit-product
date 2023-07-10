import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

export const inputSearchClassName = css`
  border-bottom: 1px solid var(${COLORS_SELECT.BORDER_COLOR});
  padding: 8px;
`;
