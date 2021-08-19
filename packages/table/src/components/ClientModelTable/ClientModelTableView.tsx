import { ButtonToolbar, RefreshButton } from '@sbercloud/uikit-react-button';
import { DeleteInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Modal } from '@sbercloud/uikit-react-modal';
import { Paginator } from '@sbercloud/uikit-react-paginator-private';
import { Toolbar } from '@sbercloud/uikit-react-toolbar';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { NoRowsOverlay } from '../../helperComponents/FrameworkComponents';
import { NoDataReasons } from '../../helperComponents/FrameworkComponents/NoRowsOverlay/types';
import { EnabledLanguages, Texts, textProvider } from '../../helpers/texts-provider';
import { ITableProps, Table } from '../Default';
import * as S from './styled';
import { DeleteProps, PaginationProps } from './types';

type ClientModelTableViewProps<T> = {
  language: EnabledLanguages;
  fieldId: string;
  data: T[];
  columnDefinitions: ITableProps['columnDefs'];
  pageSize?: number;
  onGridReady: ITableProps['onGridReady'];
  getRowHeight: ITableProps['getRowHeight'];
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
  getRowHeight,
  ...rest
}: WithSupportProps<ClientModelTableViewProps<T>>) {
  return (
    <div {...extractSupportProps(rest)}>
      <Toolbar.Wrapper className={S.SearchPanelView} data-test-id='client-table__toolbar'>
        {onRefreshCallback && (
          <RefreshButton
            as={ButtonToolbar}
            onClick={onRefreshCallback}
            data-test-id='client-table__toolbar-refresh-btn'
          />
        )}
        {deleteProps && (
          <Toolbar.Button
            disabled={!deleteProps.isDeleteEnabled}
            onClick={deleteProps.openDeleteDialog}
            data-test-id='client-table__toolbar-delete-btn'
          >
            <DeleteInterfaceSVG />
          </Toolbar.Button>
        )}
        <Toolbar.Input
          onChange={onSearchCallback}
          value={searchValue}
          placeholder={textProvider(language, Texts.searchPlaceholder)}
          data-test-id='client-table__toolbar-input'
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
        getRowHeight={getRowHeight}
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
          data-test-id='client-table__delete-modal'
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
    </div>
  );
}
