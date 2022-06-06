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
      min-height: 329px !important;
    }

    & .ag-overlay {
      .ag-overlay-no-rows-wrapper {
        padding-top: 0;
        align-items: flex-start;

        .ag-react-container {
          width: 100%;
        }
      }
    }
  }
`;

export const hideTableHeaderClassName = css`
  &.ag-theme-alpine {
    .ag-header {
      display: none;
    }
  }
`;
