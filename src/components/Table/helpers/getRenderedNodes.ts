import { TableBasicTypes } from 'components/Table/helpers/types';

export const getRenderedNodes = (
  api: TableBasicTypes.GridApi,
): TableBasicTypes.RowNode[] =>
  api?.getRenderedNodes()?.filter(row => row.selectable);
