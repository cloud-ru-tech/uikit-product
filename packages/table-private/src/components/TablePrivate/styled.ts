import { styled } from '@linaria/react';
import { VFC } from 'react';

import { TablePrivateProps } from './types';

export const styledTablePrivate = (TablePrivate: VFC<TablePrivateProps>): VFC<TablePrivateProps> => styled(
  TablePrivate,
)`
  &.ag-theme-alpine {
    .ag-center-cols-clipper,
    .ag-center-cols-container {
      min-height: 150px;
    }
  }
`;
