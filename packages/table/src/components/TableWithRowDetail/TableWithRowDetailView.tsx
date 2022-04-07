import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { ReactNode } from 'react';

import { Pagination } from '@sbercloud/uikit-react-pagination-private';
import { TablePrivate } from '@sbercloud/uikit-react-table-private';
import { Toolbar } from '@sbercloud/uikit-react-toolbar';
import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { GroupDisabledCell } from '../../helperComponents/GroupDisabledCell';
import { Texts, textProvider } from '../../helpers/texts-provider';
import * as S from './styled';
import * as Types from './types';

type TableWithRowDetailViewProps<T> = {
  data: T[];
  columnDefinitions: Types.ColumnDefinitions;
  onGridReady: Types.OnGridReady;
  onCellClicked: Types.OnCellClicked;
  onSelectionChanged(): void;
  onRowGroupOpened: Types.OnRowGroupOpened;
  detailCellRendererFramework(): ReactNode | undefined;
  searchValue: string;
  onSearchCallback: Types.OnSearchCallback;
  paginationProps?: Types.PaginationProps;
};

const additionModules = [MasterDetailModule];

export function TableWithRowDetailView<T>({
  data,
  columnDefinitions,
  onGridReady,
  onCellClicked,
  onSelectionChanged,
  onRowGroupOpened,
  detailCellRendererFramework,
  searchValue,
  onSearchCallback,
  paginationProps,
  ...rest
}: WithSupportProps<TableWithRowDetailViewProps<T>>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <div {...extractSupportProps(rest)}>
      <Toolbar.Container className={S.SearchPanelView} data-test-id='with-row-detail-table__toolbar'>
        <Toolbar.Input
          onChange={onSearchCallback}
          value={searchValue}
          placeholder={textProvider(languageCode, Texts.SearchPlaceholder)}
          data-test-id='with-row-detail-table__toolbar-input'
        />
      </Toolbar.Container>

      <TablePrivate
        rowData={data}
        additionModules={additionModules}
        columnDefs={columnDefinitions}
        className={S.radioStyle}
        onGridReady={onGridReady}
        onCellClicked={onCellClicked}
        gridOptions={{
          defaultColDef: {
            suppressMenu: true,
          },
          pagination: true,
          suppressPaginationPanel: true,
          rowSelection: 'single',
        }}
        frameworkComponents={{
          GroupDisabledCell,
        }}
        onSelectionChanged={onSelectionChanged}
        masterDetail
        detailRowAutoHeight
        isRowMaster={dataItem => !dataItem.disabled}
        icons={{
          groupExpanded: '<i class="custom-radio-unchecked"/>',
          groupContracted: '<i class="custom-radio-checked"/>',
        }}
        onRowGroupOpened={onRowGroupOpened}
        getRowClass={({ data: { disabled } }) => (disabled ? 'ag-row-disabled' : '')}
        detailCellRendererFramework={detailCellRendererFramework}
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
    </div>
  );
}
