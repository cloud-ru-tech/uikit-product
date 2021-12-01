import { css } from '@linaria/core';

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
