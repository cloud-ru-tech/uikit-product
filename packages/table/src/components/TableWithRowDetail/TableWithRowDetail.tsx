import { FC, useMemo, useState } from 'react';

import { AgGridTypes, TablePrivate, TablePrivateProps } from '@sbercloud/uikit-react-table-private';

import { GroupDisabledCell } from '../../helperComponents/GroupDisabledCell';
import { radioStyle } from '../../styles/tableWithRowDetail';

const TableRadioColumnDefine = {
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: { innerRenderer: 'GroupDisabledCell' },
};

export interface ITableWithRowDetailProps {
  rowData: TablePrivateProps['rowData'];
  columnDefs: TablePrivateProps['columnDefs'];
  onGridReady?: TablePrivateProps['onGridReady'];
  frameworkComponents?: TablePrivateProps['frameworkComponents'];
  onSelectionChanged?(selectedRows?: TablePrivateProps['rowData']): void;
}

export const TableWithRowDetail: FC<ITableWithRowDetailProps> = props => {
  const { rowData, columnDefs, onSelectionChanged, onGridReady, frameworkComponents } = props;
  const [gridApi, setGridApi] = useState<AgGridTypes.GridApi>();

  const handlerGridReady = (params: AgGridTypes.GridReadyEvent): void => {
    setGridApi(params.api);
    onGridReady?.(params);
  };

  const handlerSelectionChanged = () => {
    const selectedRows = gridApi?.getSelectedRows();
    onSelectionChanged?.(selectedRows);
  };

  const handlerRowClicked = (event: AgGridTypes.RowClickedEvent): void => {
    const target = event?.event?.target as HTMLDivElement;
    if (target?.id === 'more-button' || event.data.disabled) {
      return;
    }
    if (event.node.detail) {
      return;
    }
    if (!event.node.expanded) {
      gridApi?.forEachNode(node => {
        if (node.expanded) {
          node.setExpanded(false);
        }
      });
    }

    const nextOpenState = !event.node.expanded;
    event.node.setExpanded(nextOpenState);
    event.node.setSelected(nextOpenState);
  };

  const handlerGroupOpened = (event: AgGridTypes.RowGroupOpenedEvent): void => {
    if (event.node.expanded) {
      gridApi?.forEachNode(node => {
        if (node.expanded && node.id !== event.node.id) {
          node.setExpanded(false);
        }
      });
    }

    const nextOpenState = event.node.expanded;
    event.node.setExpanded(nextOpenState);
    event.node.setSelected(nextOpenState);
  };

  const colDefs = useMemo(() => {
    if (!columnDefs) {
      return undefined;
    }

    const newColDef = [...columnDefs];
    newColDef[0] = { ...newColDef[0], ...TableRadioColumnDefine };
    return newColDef;
  }, [columnDefs]);

  return (
    <TablePrivate
      rowData={rowData}
      columnDefs={colDefs}
      className={radioStyle}
      onGridReady={handlerGridReady}
      onRowClicked={handlerRowClicked}
      gridOptions={{
        defaultColDef: {
          suppressMenu: true,
        },
        pagination: true,
        paginationPageSize: 5,
        suppressPaginationPanel: true,
        rowSelection: 'single',
      }}
      frameworkComponents={{
        GroupDisabledCell,
        ...(frameworkComponents || {}),
      }}
      onSelectionChanged={handlerSelectionChanged}
      masterDetail
      detailRowAutoHeight
      isRowMaster={dataItem => !dataItem.disabled}
      icons={{
        groupExpanded: '<i class="custom-radio-unchecked"/>',
        groupContracted: '<i class="custom-radio-checked"/>',
      }}
      onRowGroupOpened={handlerGroupOpened}
      getRowClass={({ data: { disabled } }) => (disabled ? 'ag-row-disabled' : '')}
      detailCellRendererFramework={() => props.children}
    />
  );
};
