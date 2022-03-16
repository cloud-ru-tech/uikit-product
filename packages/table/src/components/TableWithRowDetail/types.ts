import { TablePrivateProps } from '@sbercloud/uikit-react-table-private';

export type ColumnDefinitions = TablePrivateProps['columnDefs'];
export type OnGridReady = TablePrivateProps['onGridReady'];
export type OnCellClicked = TablePrivateProps['onCellClicked'];
export type OnRowGroupOpened = TablePrivateProps['onRowGroupOpened'];
export type OnSearchCallback = (value: string) => void;

export type PaginationProps = {
  pageCount: number;
  currentPage: number;
  pageChangeHandler(currentPage: number): void;
  showPagination: boolean;
};
