import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';

import { DeleteInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Modal } from '@sbercloud/uikit-react-modal';
import { Pagination } from '@sbercloud/uikit-react-pagination-private';
import { TablePrivate, TablePrivateProps } from '@sbercloud/uikit-react-table-private';
import { Toolbar } from '@sbercloud/uikit-react-toolbar';
import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../../helpers/texts-provider';
import * as S from './styled';
import { DeleteProps, FilterProps, PaginationProps } from './types';

const additionModules = [CsvExportModule, ExcelExportModule];

type ClientModelTableViewProps<T> = {
  fieldId: string;
  data: T[];
  columnDefinitions: TablePrivateProps['columnDefs'];
  onGridReady: TablePrivateProps['onGridReady'];
  getRowHeight: TablePrivateProps['getRowHeight'];
  getRowNodeId?: TablePrivateProps['getRowNodeId'];
  useRowSelection: boolean;
  deleteProps?: DeleteProps;
  filterProps?: {
    doesRowPassFilter: FilterProps<T>['doesRowPassFilter'];
    toolbarFilter: Omit<FilterProps<T>, 'doesRowPassFilter'>;
  };
  paginationProps?: PaginationProps;
  onRefreshCallback?(): void | Promise<void>;
  onRowClicked?: TablePrivateProps['onRowClicked'];
  onRowSelected?: TablePrivateProps['onRowSelected'];
  onRowDoubleClicked?: TablePrivateProps['onRowDoubleClicked'];
  onSearchCallback(value: string): void;
  moreActions: Toolbar.MoreActionsProps['actions'];
  searchValue: string;
  rowSelection?: TablePrivateProps['rowSelection'];
};

export function ClientModelTableView<T>({
  fieldId,
  data,
  columnDefinitions,
  onGridReady,
  useRowSelection,
  onRefreshCallback,
  deleteProps,
  filterProps,
  onSearchCallback,
  searchValue,
  paginationProps,
  getRowHeight,
  getRowNodeId,
  moreActions,
  onRowClicked,
  onRowSelected,
  rowSelection,
  onRowDoubleClicked,
  ...rest
}: WithSupportProps<ClientModelTableViewProps<T>>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <div {...extractSupportProps(rest)}>
      <Toolbar.Container className={S.SearchPanelView} data-test-id='client-table__toolbar'>
        {onRefreshCallback && (
          <Toolbar.Refresh onClick={onRefreshCallback} data-test-id='client-table__toolbar-refresh-btn' />
        )}
        {deleteProps && (
          <Toolbar.Button
            disabled={!deleteProps.isDeleteEnabled}
            onClick={deleteProps.openDeleteDialog}
            data-test-id='client-table__toolbar-delete-btn'
            tooltip={{ content: textProvider(languageCode, Texts.Delete) }}
            icon={<DeleteInterfaceSVG />}
          />
        )}
        <Toolbar.Input
          onChange={onSearchCallback}
          value={searchValue}
          placeholder={textProvider(languageCode, Texts.SearchPlaceholder)}
          data-test-id='client-table__toolbar-input'
        />

        {filterProps && (
          <>
            <Toolbar.Filter {...filterProps.toolbarFilter} />
            {moreActions && <Toolbar.Divider />}
          </>
        )}
        {moreActions && (
          <Toolbar.MoreActions
            actions={moreActions}
            tooltip={{ content: textProvider(languageCode, Texts.Export) }}
            data-test-id='client-table__toolbar-more-action-btn'
          />
        )}
      </Toolbar.Container>
      <TablePrivate
        checkboxSelection={useRowSelection}
        additionModules={additionModules}
        rowData={data}
        columnDefs={columnDefinitions}
        onGridReady={onGridReady}
        getRowHeight={getRowHeight}
        getRowNodeId={getRowNodeId}
        onRowClicked={onRowClicked}
        onRowSelected={onRowSelected}
        onRowDoubleClicked={onRowDoubleClicked}
        doesRowPassFilter={filterProps?.doesRowPassFilter}
        gridOptions={{
          defaultColDef: {
            suppressMenu: true,
            sortable: true,
            resizable: true,
          },
          pagination: true,
          immutableData: true,
          getRowNodeId(data) {
            return data[fieldId];
          },
          suppressPaginationPanel: true,
          enableCellTextSelection: true,
          rowSelection: rowSelection || 'multiple',
          suppressRowClickSelection: !rowSelection,
        }}
      />
      {paginationProps?.showPagination && (
        <S.PaginationWrapper>
          <Pagination
            total={paginationProps.pageCount || 1}
            page={paginationProps.currentPage + 1}
            onChange={paginationProps.pageChangeHandler}
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
