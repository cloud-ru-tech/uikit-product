import { useEffect, useState } from 'react';

import { Pagination } from '@sbercloud/uikit-product-pagination-private';
import { TableFreePrivate, TableFreePrivateProps } from '@sbercloud/uikit-product-table-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export interface ITableFreeProps extends TableFreePrivateProps {
  classNameContainer?: string;
  checkboxSelection?: boolean;
  pageSize?: number;
}

export function TableFree({
  rowData = [],
  columnDefs = [],
  onGridReady,
  checkboxSelection = false,
  className,
  pageSize,
  noRowsText,
  context,
  columnTypes,
  components,
  domLayout,
  ...rest
}: WithSupportProps<ITableFreeProps>) {
  const [gridApi, setGridApi] = useState<ITableFreeProps['api']>();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    gridApi?.paginationSetPageSize(pageSize);
  }, [gridApi, pageSize]);

  const handleGridReady: ITableFreeProps['onGridReady'] = params => {
    setGridApi(params.api);
    onGridReady?.(params);
  };

  const handleComponentStateChanged: ITableFreeProps['onComponentStateChanged'] = params => {
    setGridApi(params.api);
    setTotalPages(params.api.paginationGetTotalPages());
  };

  return (
    <div className={className} {...extractSupportProps(rest)}>
      <TableFreePrivate
        rowData={rowData}
        columnDefs={columnDefs}
        checkboxSelection={checkboxSelection}
        onGridReady={handleGridReady}
        onComponentStateChanged={handleComponentStateChanged}
        noRowsText={noRowsText}
        context={context}
        columnTypes={columnTypes}
        components={components}
        pageSize={pageSize}
        domLayout={domLayout}
      />
      {!!pageSize && totalPages > 1 && (
        <S.PaginationWrapper>
          <Pagination
            total={totalPages}
            page={page + 1}
            onChange={page => {
              const nextPage = page - 1;

              gridApi?.paginationGoToPage(nextPage);
              setPage(nextPage);
            }}
          />
        </S.PaginationWrapper>
      )}
    </div>
  );
}
