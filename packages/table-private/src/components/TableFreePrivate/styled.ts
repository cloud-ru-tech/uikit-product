import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TABLE } = DEPRECATED_EXPORT_VARS;

export const freeTableMinHeight = css`
  &.ag-theme-alpine {
    .ag-center-cols-clipper,
    .ag-center-cols-container {
      min-height: 50px;
    }

    .ag-overlay-no-rows-wrapper {
      padding-top: 30px;
    }
  }
`;

export const freeTableFullWidthCell = css`
  &.ag-theme-alpine {
    .ag-cell-wrapper,
    .ag-cell-value {
      width: 100%;
    }
  }
`;

export const freeTableBorder = css`
  &.ag-theme-alpine {
    border: 1px solid var(${COLORS_TABLE.TABLE_BORDER});
    border-radius: 4px;
  }
`;
