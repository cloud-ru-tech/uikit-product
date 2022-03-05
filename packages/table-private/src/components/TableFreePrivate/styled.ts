import { styled } from '@linaria/react';
import { VFC } from 'react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { TableFreePrivateProps } from './types';

const { COLORS_TABLE } = DEPRECATED_EXPORT_VARS;

export const styledTableFreePrivate = (
  TableFreePrivate: VFC<TableFreePrivateProps>,
): VFC<TableFreePrivateProps> => styled(TableFreePrivate)`
  &.ag-theme-alpine {
    .ag-center-cols-clipper,
    .ag-center-cols-container {
      min-height: 50px;
    }

    .ag-overlay-no-rows-wrapper {
      padding-top: 30px;
    }
  }

  &.ag-theme-alpine {
    .ag-cell-wrapper,
    .ag-cell-value {
      width: 100%;
    }
  }

  &.ag-theme-alpine {
    border: 1px solid var(${COLORS_TABLE.TABLE_BORDER});
    border-radius: 4px;
  }

  &.ag-theme-alpine .ag-cell-value .ag-react-container {
    display: flex;
    align-items: center;
  }
`;
