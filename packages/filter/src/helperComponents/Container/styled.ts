import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { COLORS_FILTER } = DEPRECATED_EXPORT_VARS;

export const tooltipClassName = css`
  background: var(${COLORS_FILTER.FILTER_BACKGROUND});
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

  max-height: inherit;
  max-width: 640px;
  width: 640px;
  padding: 0 24px;
  color: inherit;

  overflow: inherit;
`;
