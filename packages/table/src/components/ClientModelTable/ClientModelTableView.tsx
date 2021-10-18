import { ButtonToolbar, RefreshButton } from '@sbercloud/uikit-react-button';
import { DeleteInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Modal } from '@sbercloud/uikit-react-modal';
import { Paginator } from '@sbercloud/uikit-react-paginator-private';
import { TablePrivate, TablePrivateProps } from '@sbercloud/uikit-react-table-private';
import { Toolbar } from '@sbercloud/uikit-react-toolbar';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { TextProvider, Texts } from '../../helpers/texts-provider';
import * as S from './styled';
import { DeleteProps, PaginationProps } from './types';

type ClientModelTableViewProps<T> = {
  fieldId: string;
  data: T[];
  columnDefinitions: TablePrivateProps['columnDefs'];
  onGridReady: TablePrivateProps['onGridReady'];
  getRowHeight: TablePrivateProps['getRowHeight'];
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
  onGridReady,
  useRowSelection,
  onRefreshCallback,
  deleteProps,
  onSearchCallback,
  searchValue,
  paginationProps,
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
            tooltip={{ content: TextProvider(Texts.delete) }}
          >
            <DeleteInterfaceSVG />
          </Toolbar.Button>
        )}
        <Toolbar.Input
          onChange={onSearchCallback}
          value={searchValue}
          placeholder={TextProvider(Texts.searchPlaceholder)}
          data-test-id='client-table__toolbar-input'
        />
      </Toolbar.Wrapper>
      <TablePrivate
        checkboxSelection={useRowSelection}
        rowData={data}
        columnDefs={columnDefinitions}
        onGridReady={onGridReady}
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
