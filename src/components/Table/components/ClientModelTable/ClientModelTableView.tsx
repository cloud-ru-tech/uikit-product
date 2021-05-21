import { ListToolBar, Modal, Paginate, RefreshButton } from 'components';
import { DeleteSVG } from '@sbercloud/icons';
import { NoDataReasons } from 'components/Table/helperComponents/FrameworkComponents/NoRowsOverlay/types';
import {
  Languages,
  textProvider,
  Texts,
} from 'components/Table/helpers/texts-provider';
import { DeleteProps, PaginationProps } from './types';
import { NoRowsOverlay } from '../../helperComponents/FrameworkComponents';
import { ITableProps, Table } from '../Default';
import * as S from './styled';

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
      <ListToolBar.Wrapper className={S.SearchPanelView}>
        {onRefreshCallback && (
          <ListToolBar.Button>
            <RefreshButton onRefresh={onRefreshCallback} />
          </ListToolBar.Button>
        )}
        {deleteProps && (
          <ListToolBar.Button
            disabled={!deleteProps.isDeleteEnabled}
            onClick={deleteProps.openDeleteDialog}
          >
            <DeleteSVG />
          </ListToolBar.Button>
        )}
        <ListToolBar.Input
          onChange={onSearchCallback}
          value={searchValue}
          placeholder={textProvider(language, Texts.searchPlaceholder)}
        />
      </ListToolBar.Wrapper>
      <Table
        checkboxSelection={useRowSelection}
        rowData={data}
        columnDefs={columnDefinitions}
        onGridReady={onGridReady}
        noRowsOverlayComponentFramework={NoRowsOverlay}
        noRowsOverlayComponentParams={{
          reason:
            data.length === 0
              ? NoDataReasons.InitialEmpty
              : NoDataReasons.Search,
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
          <Paginate
            pageCount={paginationProps.pageCount || 1}
            onPageChange={paginationProps.pageChangeHandler}
            disableInitialCallback
            forcePage={paginationProps.currentPage}
            placement='left'
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
