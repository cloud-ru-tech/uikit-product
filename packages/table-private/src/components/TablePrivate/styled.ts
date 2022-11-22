import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { VFC } from 'react';

import { TablePrivateProps } from './types';

export const styledTablePrivate = (TablePrivate: VFC<TablePrivateProps>): VFC<TablePrivateProps> => styled(
  TablePrivate,
)`
  &.ag-theme-alpine {
    .ag-center-cols-clipper,
    .ag-center-cols-container {
      min-height: unset !important;
    }

    & .ag-overlay {
      .ag-overlay-no-rows-wrapper {
        padding-top: 0;
        align-items: flex-start;

        .ag-react-container {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;

export const hideNoRowsOverlayClassName = css`
  .ag-overlay {
    display: none;
  }
`;

export const showTableOverlayClassName = css`
  &:not(.${hideNoRowsOverlayClassName}) {
    &.ag-theme-alpine {
      .ag-header {
        display: none;
      }

      .ag-center-cols-clipper,
      .ag-center-cols-container {
        min-height: 310px !important;
      }
    }
  }
`;
