import { TableBasicTypes } from './types';

export const getRenderedNodes = (api: TableBasicTypes.GridApi): TableBasicTypes.RowNode[] =>
  api?.getRenderedNodes()?.filter(row => row.selectable);
