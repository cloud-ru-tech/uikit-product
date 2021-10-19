import { ButtonToolbar, RefreshButton } from '@sbercloud/uikit-react-button';
import { DeleteInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Modal } from '@sbercloud/uikit-react-modal';
import { Paginator } from '@sbercloud/uikit-react-paginator-private';
import { TablePrivate, TablePrivateProps } from '@sbercloud/uikit-react-table-private';
import { Toolbar } from '@sbercloud/uikit-react-toolbar';
import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../../helpers/texts-provider';
import * as S from './styled';
import { DeleteProps, FilterProps, PaginationProps } from './types';

type ClientModelTableViewProps<T> = {
  fieldId: string;
  data: T[];
  columnDefinitions: TablePrivateProps['columnDefs'];
  onGridReady: TablePrivateProps['onGridReady'];
  getRowHeight: TablePrivateProps['getRowHeight'];
  useRowSelection: boolean;
  deleteProps?: DeleteProps;
  filterProps?: {
    doesRowPassFilter: FilterProps<T>['doesRowPassFilter'];
    toolbarFilter: Omit<FilterProps<T>, 'doesRowPassFilter'>;
  };
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
  filterProps,
  onSearchCallback,
  searchValue,
  paginationProps,
  getRowHeight,
  ...rest
}: WithSupportProps<ClientModelTableViewProps<T>>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
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
            tooltip={{ content: textProvider(languageCode, Texts.Delete) }}
          >
            <DeleteInterfaceSVG />
          </Toolbar.Button>
        )}
        <Toolbar.Input
          onChange={onSearchCallback}
          value={searchValue}
          placeholder={textProvider(languageCode, Texts.SearchPlaceholder)}
          data-test-id='client-table__toolbar-input'
        />
        {filterProps && <Toolbar.Filter {...filterProps.toolbarFilter} />}
      </Toolbar.Wrapper>
      <TablePrivate
        checkboxSelection={useRowSelection}
        rowData={data}
        columnDefs={columnDefinitions}
        onGridReady={onGridReady}
        getRowHeight={getRowHeight}
        doesRowPassFilter={filterProps?.doesRowPassFilter}
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
