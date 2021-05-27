import { DeleteSVG } from '@sbercloud/icons';
import { RefreshButton } from '@sbercloud/uikit-react-button';
import { Modal } from '@sbercloud/uikit-react-modal';
import { Paginator } from '@sbercloud/uikit-react-paginator-private';
import { Toolbar } from '@sbercloud/uikit-react-toolbar';

import { NoRowsOverlay } from '../../helperComponents/FrameworkComponents';
import { NoDataReasons } from '../../helperComponents/FrameworkComponents/NoRowsOverlay/types';
import { Languages, Texts, textProvider } from '../../helpers/texts-provider';
import { ITableProps, Table } from '../Default';
import * as S from './styled';
import { DeleteProps, PaginationProps } from './types';

type ClientModelTableViewProps<T> = {
  language: Languages;
  fieldId: string;
  data: T[];
  columnDefinitions: ITableProps['columnDefs'];
  pageSize?: number;
  onGridReady: ITableProps['onGridReady'];
  useRowSelection: boolean;
  deleteProps?: DeleteProps;
  paginationProps?: PaginationProps;
  onRefreshCallback?(): void | Promise<void>;
  onSearchCallback(value: string): void;
  searchValue: string;
};

export function ClientModelTableView<T>({
  fieldId,
  data,
  columnDefinitions,
  pageSize,
  onGridReady,
  useRowSelection,
  onRefreshCallback,
  deleteProps,
  onSearchCallback,
  searchValue,
  paginationProps,
  language,
}: ClientModelTableViewProps<T>) {
  return (
    <>
      <Toolbar.Wrapper className={S.SearchPanelView}>
        {onRefreshCallback && (
          <Toolbar.Button>
            <RefreshButton onRefresh={onRefreshCallback} />
          </Toolbar.Button>
        )}
        {deleteProps && (
          <Toolbar.Button disabled={!deleteProps.isDeleteEnabled} onClick={deleteProps.openDeleteDialog}>
            <DeleteSVG />
          </Toolbar.Button>
        )}
        <Toolbar.Input
          onChange={onSearchCallback}
          value={searchValue}
          placeholder={textProvider(language, Texts.searchPlaceholder)}
        />
      </Toolbar.Wrapper>
      <Table
        checkboxSelection={useRowSelection}
        rowData={data}
        columnDefs={columnDefinitions}
        onGridReady={onGridReady}
        noRowsOverlayComponentFramework={NoRowsOverlay}
        noRowsOverlayComponentParams={{
          reason: data.length === 0 ? NoDataReasons.InitialEmpty : NoDataReasons.Search,
          language,
        }}
        gridOptions={{
          defaultColDef: {
            suppressMenu: true,
            sortable: true,
            resizable: true,
            cellStyle: {
              textOverflow: 'ellipsis',
              display: 'block',
              verticalAlign: 'middle',
            },
          },
          pagination: true,
          immutableData: true,
          getRowNodeId(data) {
            return data[fieldId];
          },
          ensureDomOrder: true,
          paginationPageSize: pageSize,
          suppressPaginationPanel: true,
          enableCellTextSelection: true,
          rowSelection: 'multiple',
        }}
      />
      {paginationProps?.showPagination && (
        <S.PaginationWrapper>
          <Paginator
            pageCount={paginationProps.pageCount || 1}
            onPageChange={paginationProps.pageChangeHandler}
            disableInitialCallback
            forcePage={paginationProps.currentPage}
            placement={Paginator.placements.Left}
          />
        </S.PaginationWrapper>
      )}
      {deleteProps && (
        <Modal
          isOpen={deleteProps.deleteDialogOpened}
          title={deleteProps.title}
          appElement={document.body}
          description={deleteProps.description}
          approveText={deleteProps.approveText}
          cancelText={deleteProps.cancelText}
          approve={deleteProps.onConfirmDelete}
          cancel={deleteProps.onCancelDelete}
          onRequestClose={deleteProps.onCancelDelete}
        />
      )}
    </>
  );
}
